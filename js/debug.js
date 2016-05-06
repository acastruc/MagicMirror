/**
 * Created by acastrucci on 2016-03-03.
 *
 * Functions to aid debugging
 */

(function ($, MagicMirror) {

    var debug = {
        toggle: function() {
            $('#dbg-log').toggle();
        },

        show: function () {
            $('#dbg-log').show();
        },

        hide: function () {
            $('#dbg-log').hide();
        },

        init: function () {

            $('body').keypress(function (e) {
                var key = (e.keyCode || e.which);
                MagicMirror.logger.info("Detected keypress:" + key);

                if (key === 13) { //ENTER reload the screen
                    //enter key
                    MagicMirror.logger.info('ENTER key detected, reloading page');
                    document.location.reload(true);
                } else if (key === 108) { //'l' toggles logging window
                    MagicMirror.logger.info('L key detected, toggling debug display');
                    MagicMirror.debug.toggle();
                } else if (key === 109) { //'m' toggles map
                    MagicMirror.logger.info('M key detected, toggling map');
                    MagicMirror.geolocate.toggle();
                } else if (key === 115) { //'s' spirit
                    MagicMirror.mirrorspirit.toggle();
                } else if (key === 118) {
                    MagicMirror.logger.info('V key detected, toggling voice control');
                    MagicMirror.voicecontrol.toggle();
                } else if (key === 32) { //SPACE
                    MagicMirror.logger.info('SPACE key detected - toggling display');
                    MagicMirror.onoff.toggle();
                } else if (key === 120) { //X
                    MagicMirror.logger.info('X key detected - toggling xkcd');
                    MagicMirror.xkcd.togglme();
                }

            });

            var config = MagicMirror.config;
            if(config.debug.showLogging) {
                this.show();
            } else {
                this.hide();
            }
        }
    };

    MagicMirror.debug = debug;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});