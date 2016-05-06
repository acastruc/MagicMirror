/**
 * Created by acastrucci on 2016-03-03.
 * Geolocation services
 */

(function ($, MagicMirror) {

    var geolocate = {
        mapElement: '#map',
        fadeInterval: 400,

        init: function () {
            $(geolocate.mapElement).fadeOut(0);
        },

        show: function () {
            MagicMirror.logger.info('Showing geolocate:map...');
            $(geolocate.mapElement).fadeIn(geolocate.fadeInterval);
        },

        hide: function () {
            MagicMirror.logger.info('Hide geolocate:map...');
            $(geolocate.mapElement).fadeOut(geolocate.fadeInterval);
        },

        toggle: function () {
            MagicMirror.logger.info('Toggling geolocate:map...');
            $(geolocate.mapElement).fadeToggle(geolocate.fadeInterval);
        }
    };

    MagicMirror.geolocate = geolocate;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});

