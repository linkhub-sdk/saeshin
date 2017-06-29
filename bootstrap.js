
(function () {

    function textOnKeyDown() {
        console.log($(this).val());
    }


    var proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        this.addEventListener("keydown", textOnKeyDown);
    };

    document.registerElement("linkhub-number", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        this.addEventListener("keydown", textOnKeyDown);
    };

    document.registerElement("linkhub-eng", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "radio";
        $(this).wrap('<label class="lh-radio-label"/>').after($(this).attr("label"));

    };

    document.registerElement("linkhub-radio", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "checkbox";
        $(this).wrap('<label class="lh-checkbox-label"/>').after($(this).attr("label"));
    };

    document.registerElement("linkhub-checkbox", {prototype: proto,extends: 'input'});

    proto = Object.create(HTMLInputElement.prototype);
    proto.createdCallback = function() {
        this.type = "text";
        $(this).after('<button is="linkhub-button">🗓</button>');
    };

    document.registerElement("linkhub-date", {prototype: proto,extends: 'input'});

    $(document).on("click",'tabs > tab',function(e){
        $(this).siblings("tab[selected]").removeAttr("selected");
        $(this).attr("selected","selected");
    });

})();
