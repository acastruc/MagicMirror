/**
 * Created by acastrucci on 2016-03-04.
 *
 * Get the latest xkcd comic
 */

(function ($, MagicMirror) {

    var config = MagicMirror.config;
    var fadeTime = config.xkcd.fadeInterval || 2000;
    var xkcd = {
        imageLocation: '#xkcd-img',
        init: function () {
            $(xkcd.imageLocation).hide();

            //get the latest
            xkcd.getNewestURL().done(function (data) {

                $(xkcd.imageLocation).attr({
                            src: data.img,
                            title: data.alt,
                            alt: data.title
                });
            }).fail(function () {
                MagicMirror.logger.error("Failed to retrieve XKCD...");
            });
        },

        toggle: function () {
            MagicMirror.logger.info("Toggling XKCD...");
            $(xkcd.imageLocation).fadeToggle(xkcd.fadeInterval);
        },

        hide: function () {
            MagicMirror.logger.info("Hiding XKCD...");
            $(xkcd.imageLocation).fadeOut(xkcd.fadeInterval);
        },

        getNewestURL: function () {
            return $.ajax({
                url: "http://dynamic.xkcd.com/api-0/jsonp/comic?callback=?",
                dataType: "json",
                jsonpCallback: "xkcddata"
            });
        }
    };

    MagicMirror.xkcd = xkcd;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});
