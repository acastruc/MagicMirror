/**
 * Created by acastrucci on 2016-03-04.
 *
 * The spirit of the man in the mirror...
 */

(function ($, MagicMirror) {

    var config = MagicMirror.config;
    var spirit = {
        faceContainerLocation: '#spirit',
        faceImageLocation: '#spirit-img',
        fadeInterval: config.spirit.fadeInterval || 2000,

        toggle: function () {
             $(spirit.faceContainerLocation).fadeToggle(spirit.fadeInterval);
        },

        hide: function () {
            $(spirit.faceContainerLocation).fadeOut(spirit.fadeInterval);
        },

        init: function () {
            MagicMirror.logger.info("Loading spirit image " + config.spirit.url);
            $(spirit.faceContainerLocation).hide();
            $(spirit.faceImageLocation).attr('src', config.spirit.url);
            $(spirit.faceContainerLocation + ' .img-caption').text(config.spirit.caption);
        }
    };

    MagicMirror.mirrorspirit = spirit;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});