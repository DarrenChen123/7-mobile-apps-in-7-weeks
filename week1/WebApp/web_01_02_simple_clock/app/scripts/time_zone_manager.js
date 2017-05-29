(function($) {

    var TimeZoneManager = {

        savedTimeZones: [],

        fetchTimeZones: function(completion) {

            var successFunction = _.bind(function(data) {
                this.timeZones = data;
                if (completion) completion(data);
            }, this);
            $.ajax({
                url : "http://localhost:3000/clock/time_zones",
                headers: {Accept: "application/json"},
                success: successFunction
            });
        },

        savedZones: function(includeCurrent) {
            var zones = [].concat(this.savedTimeZones);
            if (includeCurrent) {
                var refDate = new Date();
                var offsetMinutes = refDate.getTimezoneOffset();
                zones.push({
                    name: "Current",
                    zone_name: "Current",
                    offset: -offsetMinutes * 60,
                    formatted_offset: this.formattedOffsetMinutes(-offsetMinutes)
                });
            }
            return zones;
        },

        formattedOffsetMinutes: function(offsetMinutes) {
            var offsetHours = offsetMinutes / 60;
            offsetHours = Math.abs(offsetHours).toString() + ":00";
            if (offsetMinutes < 600) offsetHours = "0" + offsetHours;
            if (offsetMinutes < 0) offsetHours = "-" + offsetHours;
            return offsetHours;
        },

        createClocksIn : function(list) {
            var zones = this.savedZones(true);
            _.each(zones, function(zone) {
                var item = $("<li class='clock'/>");
                $(list).append(item);
            });
        },

        saveZoneAtIndex : function(index) {
            var zone = this.timeZones[index];
            this.savedTimeZones.push(zone);
        },

        allZones: function() {
            return this.timeZones;
        },
    };


    $.app.register("managers.TimeZoneManager", TimeZoneManager);

})(jQuery);

