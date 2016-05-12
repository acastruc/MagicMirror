/**
 * Created by acastrucci on 2016-03-03.
 */
(function ($, MagicMirror) {

    $(document).ready(function () {
        MagicMirror.logger.info('Initializing MagicMirror interface v' + MagicMirror.config.version);

        MagicMirror.debug.init();
        MagicMirror.geolocate.init();
        MagicMirror.time.init();
        MagicMirror.weather.init();
        MagicMirror.rss.init();
        MagicMirror.smalltalk.init();
        MagicMirror.mirrorspirit.init();
        MagicMirror.xkcd.init();
        MagicMirror.onoff.init();
        MagicMirror.voicecontrol.init();

        /*
         MagicMirror.giphy.init();
         MagicMirror.kittens.init();
         MagicMirror.youtube.init();
         MagicMirror.google.init();
         */

        //MagicMirror.voicecontrol.addCommand("(*noise) show map (*noise)", MagicMirror.geolocate.toggle);
        //MagicMirror.voicecontrol.addCommand("go to sleep (*noise)", MagicMirror.onoff.sleep);
        //MagicMirror.voicecontrol.addCommand("wake up (*noise)", MagicMirror.onoff.awaken);
        //MagicMirror.voicecontrol.addCommand("mirror mirror on the wall", MagicMirror.mirrorspirit.toggle);
        //MagicMirror.voicecontrol.addCommand("(*noise) xkcd (*noise)", MagicMirror.xkcd.toggle);
        //MagicMirror.voicecontrol.addCommand("(*noise) (go) home (*noise)", MagicMirror.home);
        //MagicMirror.voicecontrol.addCommand("test", MagicMirror.home);
        MagicMirror.voicecontrol.addCommand("show map", MagicMirror.geolocate.toggle);
        MagicMirror.voicecontrol.addCommand("go to sleep", MagicMirror.onoff.sleep);
        MagicMirror.voicecontrol.addCommand("wake up", MagicMirror.onoff.awaken);
        MagicMirror.voicecontrol.addCommand("mirror mirror on the wall", MagicMirror.mirrorspirit.toggle);
        MagicMirror.voicecontrol.addCommand("xkcd", MagicMirror.xkcd.toggle);
        MagicMirror.voicecontrol.addCommand("(go) home", MagicMirror.home);
        MagicMirror.voicecontrol.addCommand("test", MagicMirror.home);
    });

    jQuery.fn.updateWithText = function(text, speed)
    {
        var dummy = $('<div/>').html(text);

        if ($(this).html() != dummy.html())
        {
            $(this).fadeOut(speed/2, function() {
                $(this).html(text);
                $(this).fadeIn(speed/2, function() {
                    //done
                });
            });
        }
    }

    jQuery.fn.outerHTML = function(s) {
        return s
            ? this.before(s).remove()
            : jQuery("<p>").append(this.eq(0).clone()).html();
    };

    MagicMirror.roundVal = function(temp) {
        return Math.round(temp * 10) / 10;
    }

    MagicMirror.home = function () {
        MagicMirror.logger.info('Returning to MagicMirror home...');
        MagicMirror.mirrorspirit.hide();
        MagicMirror.geolocate.hide();
        MagicMirror.onoff.awaken();
        MagicMirror.xkcd.hide();
    };

})(jQuery, window.MagicMirror =  window.MagicMirror || {});