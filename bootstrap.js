$.fn.caret = function(pos) {
    if(pos == undefined || pos == 'undefined') {
        var ctrl = this[0];
        var CaretPos = 0;

        if (ctrl.selectionStart || ctrl.selectionStart == 0) {// Standard.
            CaretPos = ctrl.selectionStart;
        } else if (document.selection) {// Legacy IE
            ctrl.focus ();
            var Sel = document.selection.createRange ();
            Sel.moveStart ('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        }
        return (CaretPos);
    } else {
        var ctrl = this[0];
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
        } else if (ctrl.createTextRange) {

            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
        return this;
    }
}
$.fn.caretToEnd = function() {
    var ctrl = this[0];
    if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(false);
        range.select();
    } else if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange($(this).val().length,$(this).val().length);
    }
    return this;
}

$.fn.filteredValue = function(newVal) {
    if(this.val() != newVal) {
        var gap = this.val().length - newVal.length;
        var oldCaret = $(this).caret();
        this.val(newVal)
            .caret(oldCaret - gap);
     }
     return this;
};

(function () {
    $(document).on("keydown",'input[type=text]',function(e) {
       if (($(this).is('[nospace]') || $(this).is('[number]')) && e.which === 32) return false;
       if ( $(this).is('[number]')) {
           if(/[A-Z]/g.test(String.fromCharCode(e.keyCode))) return false;
           else console.log(e.keyCode);
       }
       if ( $(this).is('[number]') && e.which === 189) {
           if($(this).is('[positive]')) return false;
           if($(this).val() == '') return true;

           var newVal = ($(this).is('[cost]') ? $(this).val().replace(/,/g,'') : $(this).val()) * -1;

           if(isNaN(newVal))newVal = '';
           if($(this).is('[cost]')) newVal = newVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

           $(this).filteredValue(newVal);
           $(this).caretToEnd();
           e.preventDefault();
           return false;
       }
    });

    $(document).on("keyup change",'input[type=text][english]',function(e) {
        var newVal = $(this).val().replace(/[^\a-zA-Z ]/g,'');
        $(this).filteredValue(newVal);
    });
    $(document).on("keyup change",'input[type=text][number]',function(e) {
        var newVal = $(this).val().replace(/[^\d-]/g,'');
        if(!(newVal == '' || newVal == '-')) {
            newVal = Number(newVal);
            if(isNaN(newVal))newVal = '';
        }
        if($(this).is('[positive]')) newVal = Math.abs(newVal);
        if($(this).is('[cost]')) {
            newVal = newVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        $(this).filteredValue(newVal);
        $(this).caretToEnd();
    });

    $(document).on("keyup change",'input[type=text][exclude]',function(e) {
        var newVal = $(this).val().replace(new RegExp($(this).attr('exclude'),'g'),'');
        $(this).filteredValue(newVal);
    });

    $(document).on("click",'tabs > tab',function(e){
        $(this).siblings("tab[selected]").removeAttr("selected");
        $(this).attr("selected","selected");
    });
})();
