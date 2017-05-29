(function($) {

    var namespaces = $.app.namespaces,
        tzManager = namespaces.managers.TimeZoneManager;

    var Clock = {
        tick : function() {
            var date = new Date(),
                tzManager = namespaces.managers.TimeZoneManager,
                zones = tzManager.savedZones(true);
            var updateClockAtIndex = function(index, element) {
                var zone = zones[index],
                    formattedTime = this.convertAndFormatDate(zone.offset, date);
                $(element).text(formattedTime);
            };
            updateClockAtIndex = _.bind(updateClockAtIndex, this);
            $(".clock-time").each(updateClockAtIndex);
        },

        convertAndFormatDate : function(offset, date) {
            var convertedSeconds = date.getUTCMinutes() * 60 + date.getUTCHours() * 3600 + offset,
                hour = Math.floor(convertedSeconds / 3600),
                minutes = Math.abs(
                 Math.floor((convertedSeconds - (hour * 3600)) / 60)
                );
            if (hour < 0) {
                hour = hour + 24;
            } else if (hour >= 24) {
                hour = hour - 24;
            }

            var formattedTime = this.zeroPad(hour) + ":" + this.zeroPad(minutes);
            return formattedTime;
        },

        zeroPad : function(number) {
            var s = number.toString();
            var formattedNumber = (s.length > 1) ? s : "0" + s;
            return formattedNumber;
        },

        start: function() {
            this.tick();
            var tickFunction = _.bind(this.tick, this);
            setInterval(tickFunction, 1000);
        },
    };

    $.app.register("models.Clock", Clock);
})(jQuery);
