/**
 * Created by acastrucci on 2016-03-03.
 *
 * Show+update the time
 */
(function ($, MagicMirror) {
    var config = MagicMirror.config;

    var time_settings = {
        timeFormat: config.time.timeFormat || 24,
        dateLocation: '.date',
        timeLocation: '#time',
        updateInterval: 1000,
        intervalId: undefined,
        displaySeconds: (typeof config.time.displaySeconds == 'undefined') ? true : config.time.displaySeconds,
        digitFade: (typeof config.time.digitFade == 'undefined') ? false : config.time.digitFade
    };

    var time = {

        update: function () {

            var timeLocation = time_settings.timeLocation;
            var _now = moment();
            var _date = _now.format('[<span class="dayname">]dddd,[</span> <span class="longdate">]LL[</span>]');

            $(time_settings.dateLocation).updateWithText(_date, 1000);
            $('.fade').removeClass('fade')
            var html = ''
            if (time_settings.displaySeconds) {
                html = _now.format(time_settings._timeFormat+':mm').replace(/./g, '<span class="digit">$&</span>') +
                    '<span class="sec">' + _now.format('ss').replace(/./g, '<span class="digit">$&</span>') + '</span>';
                if (typeof time_settings.intervalId == 'undefined') {
                    time_settings.intervalId = setInterval(function () {
                        this.update();
                    }.bind(this), time_settings.updateInterval);
                }
            } else {
                html = _now.format(time_settings._timeFormat+':mm').replace(/./g, '<span class="digit">$&</span>');
                if (time_settings.intervalId) {
                    clearInterval(time_settings.intervalId);
                    time_settings.intervalId = undefined;
                }
                seconds = 60 - (new Date()).getSeconds();
                setTimeout(function () {
                    this.update();
                }.bind(this), seconds*1000);
            }
            if (time_settings.digitFade) {
                var diff = $('<div>').html(html);
                diff.find('.digit').each(function( index ) {
                    var _text  = $( this ).text();
                    var _i = index+1;
                    var liveNode = $(timeLocation).find('.digit')[index]
                    if (typeof liveNode != 'undefined') {
                        liveNode = $(liveNode);
                        var _text2 = liveNode.text();
                        if (_text != _text2) {

                            liveNode.addClass('fade');
                            $(this).addClass('fade');
                        }
                    } else {
                        $(this).addClass('fade');
                    }
                });
                if ($('.fade').length == 0) {
                    // Initial Update
                    $(time_settings.timeLocation).html(diff.html());
                    diff = undefined;
                } else {
                    $('.fade').fadeTo(400, 0.25, function() {
                        if (typeof diff != 'undefined') {
                            $(time_settings.timeLocation).html(diff.html());
                            diff = undefined;
                        }
                        $('.fade').fadeTo(400, 1).removeClass('fade');
                    }.bind(this));
                }
            } else {
                if (time_settings.displaySeconds) {
                    $(time_settings.timeLocation).html(_now.format(time_settings._timeFormat+':mm[<span class="sec">]ss[</span>]'));
                } else {
                    $(time_settings.timeLocation).html(_now.format(time_settings._timeFormat+':mm'));
                }
            }
        },

        init: function () {
            moment.locale(config.lang);
            if (parseInt(time_settings.timeFormat) === 12) {
                time_settings._timeFormat = 'hh'
            } else {
                time_settings._timeFormat = 'HH';
            }
            this.update();
        }
    };

    MagicMirror.time = time;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});
