
(function () {

    function textOnKeyDown() {
        console.log($(this).val());
    }


    var proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        this.addEventListener("keydown", textOnKeyDown);
    };

    document.registerElement("lh-number", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        this.addEventListener("keydown", textOnKeyDown);
    };

    document.registerElement("lh-eng", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "radio";
        $(this).wrap('<label class="lh-radio-label"/>').after($(this).attr("label"));

    };

    document.registerElement("lh-radio", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "checkbox";
        $(this).wrap('<label class="lh-checkbox-label"/>').after($(this).attr("label"));
    };

    document.registerElement("lh-checkbox", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        $(this).after('<button is="lh-button">🗓</button>');
    };

    document.registerElement("lh-date", {prototype: proto,extends: 'input'});

    $(document).on("click",'tabs > tab',function(e){
        $(this).siblings("tab[selected]").removeAttr("selected");
        $(this).attr("selected","selected");
    });

})();
