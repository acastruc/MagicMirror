/**
 * Created by acastrucci on 2016-03-04.
 * Toggle display on/off
 */

(function ($, MagicMirror) {

    var config = MagicMirror.config;
    var fadeTime = config.fadeInterval || 2000;
    var onoff = {
        sleep: function () {
            //turn off screen
            MagicMirror.logger.info('TODO Put display to sleep...');
            $(document.body).fadeOut(fadeTime);
        },

        awaken: function () {
            MagicMirror.logger.info('TODO Awaken the display...');
            $(document.body).fadeIn(fadeTime);
        },

        toggle: function () {
            MagicMirror.logger.info('TODO Toggling the display...');
            $(document.body).fadeToggle(fadeTime);
        },

        init: function () {

        }
    };

    MagicMirror.onoff = onoff;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});


