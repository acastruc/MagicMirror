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
            var now = new Date();
            var logTime = now.toLocaleDateString("en-US") + ' ' + now.toLocaleTimeString() + ' ';
            type = type || 'info';
            lines.push({text: logTime + s.toString(), type: type});
            if(lines.length > MAX_LINES) {
                lines.shift();
            }
            var msg = '';
            for(var i=0; i<lines.length; i++) {
                msg += '<p class="' + lines[i].type +'">' + lines[i].text + '</p>';
            }
            $('#dbg-log').empty();
            $('#dbg-log').html(msg);
        }
    };

    MagicMirror.logger = logger;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});

