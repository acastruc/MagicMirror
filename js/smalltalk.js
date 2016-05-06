/**
 * Created by acastrucci on 2016-03-04.
 * Functions to simulate primitive smalltalk
 */

(function ($, MagicMirror) {
    var config = MagicMirror.config;
    var smalltalk = {
        responses: [],
        greeting: function (msg) {
            //TODO return an appropriate response
        },

        init: function (resps) {
            smalltalk.responses = resps || [];
            if(config.smalltalk.responses && config.smalltalk.responses.length) {
                smalltalk.responses.concat(config.smalltalk.responses);
            }

        }
    };

    MagicMirror.smalltalk = smalltalk;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});
