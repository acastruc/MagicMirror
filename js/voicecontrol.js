/**
 * Created by acastrucci on 2016-03-04.
 */

(function ($, MagicMirror, annyang) {
    var config = MagicMirror.config;
    var voicecontrol = {
        init: function (commands) {
            if(!annyang){
                MagicMirror.logger.error('annyang failed to load');
            }
            if(commands){
                annyang.init(commands, true);
            }
            annyang.debug(true);

            if (config.voicecontrol.startListeningOnLoad) {
                voicecontrol.start();
            } else {
                MagicMirror.logger.info('annyang is NOT running...');
            }

            //Track when the Annyang is listening to us
            annyang.addCallback('start', function (data) {
                console.log('\nannyang started ' + data);
            });
            annyang.addCallback('end', function(data) {
                console.log("\nannyang ended", data)
            });
            annyang.addCallback('interimResult', function(data) {
                console.log('\nannyang interim: ' + data);
            });
            annyang.addCallback('result', function(data){
                console.log('\nannyang result ' + data);
            });
        },

        start: function () {
            if(annyang){
                annyang.start();
                MagicMirror.logger.info('Started listening via annyang...');
            } else {
                MagicMirror.logger.error('Failed to start annyang');
            }

        },

        stop: function () {
            if(annyang){
                annyang.stop();
                MagicMirror.logger.info('Stopped listening with annyang...');
            } else {
                MagicMirror.logger.error('Error stopping annyang...not loaded');
            }
        },

        toggle: function () {
            if(annyang) {

                if (annyang.isListening()) {
                    MagicMirror.logger.info('Abort listening with annyang...');
                    annyang.abort();
                } else {
                    MagicMirror.logger.info('Start listening with annyang...');
                    annyang.start();
                }
            } else {
                MagicMirror.logger.error('Error toggling annyang...not loaded');
            }
        },

        addCommand: function (matcher, func) {
            if(annyang) {
                var command = {};
                command[matcher] = func;
                annyang.addCommands(command);
            }
        },

        removeCommand: function (matcher) {
            if(annyang) {
                annyang.removeCommand(matcher);
            }
        }
    };

    MagicMirror.voicecontrol = voicecontrol;
})(jQuery, window.MagicMirror =  window.MagicMirror || {}, window.annyang);
