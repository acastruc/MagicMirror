/**
 * Created by acastrucci on 2016-03-03.
 *
 * Logging
 */

(function ($, MagicMirror) {
    var lines = [];
    var MAX_LINES = 7;
    var logger = {

        info: function (s) {
            console.info(s);
            this.toDebug(s, 'info');
        },

        warning: function (s) {
            console.warn(s);
            this.toDebug(s, 'warning');
        },

        error: function (s) {
            console.error(s);
            this.toDebug(s, 'error');
        },

        init: function () {
            this.toDebug("Init logger...");
        },

        toDebug: function(s, type) {
            type = type || 'info';
            lines.push(s.toString());
            if(lines.length > MAX_LINES) {
                lines.shift();
            }
            var msg;
            for(var i=0; i<lines.length; i++) {
                msg += '<p class="' + type +'">' + lines[i] + '</p>';
            }
            $('#dbg-log').html(msg);
        }
    };

    MagicMirror.logger = logger;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});

