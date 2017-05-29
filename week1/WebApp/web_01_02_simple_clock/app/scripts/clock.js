(function($) {

    var Clock = {
        tick : function() {
            var date = new Date();
            $(".clock").text(date.getHours() +
                        ":" + this.zeroPad(date.getMinutes()) +
                        ":" + this.zeroPad(date.getSeconds()));
        },

        zeroPad : function(number) {
            var s = number.toString();
            var formattedNumber = (s.length > 1) ? s : "0" + s;
            return formattedNumber;
        }
    };

    $.app.register("models.Clock", Clock);
})(jQuery);
