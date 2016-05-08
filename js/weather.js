/**
 * Created by acastrucci on 2016-03-03.
 *
 * Weather forecast functions, copied from https://github.com/MichMich/MagicMirror
 */


(function ($, MagicMirror) {

    var config = MagicMirror.config;

    var weather = {
        lang: config.lang || 'en',
        params: config.weather.params || null,
        iconTable: {
            '01d':'wi-day-sunny',
            '02d':'wi-day-cloudy',
            '03d':'wi-cloudy',
            '04d':'wi-cloudy-windy',
            '09d':'wi-showers',
            '10d':'wi-rain',
            '11d':'wi-thunderstorm',
            '13d':'wi-snow',
            '50d':'wi-fog',
            '01n':'wi-night-clear',
            '02n':'wi-night-cloudy',
            '03n':'wi-night-cloudy',
            '04n':'wi-night-cloudy',
            '09n':'wi-night-showers',
            '10n':'wi-night-rain',
            '11n':'wi-night-thunderstorm',
            '13n':'wi-night-snow',
            '50n':'wi-night-alt-cloudy-windy'
        },
        temperatureLocation: '.temp',
        windSunLocation: '.windsun',
        forecastLocation: '.forecast',
        apiVersion: '2.5',
        apiBase: 'http://api.openweathermap.org/data',
        weatherEndpoint: 'weather',
        forecastEndpoint: 'forecast/daily',
        updateInterval: config.weather.interval || 10000,
        fadeInterval: config.weather.fadeInterval || 1000,
        intervalId: null,
        orientation: config.weather.orientation || 'vertical',

        roundValue: function (temperature) {
            return parseFloat(temperature).toFixed(1);
        },

        updateCurrentConditions: function () {
            $.ajax({
                type: 'GET',
                url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.weatherEndpoint,
                dataType: 'json',
                data: weather.params,
                success: function (data) {

                    var _temperature = this.roundValue(data.main.temp),
                        _temperatureMin = this.roundValue(data.main.temp_min),
                        _temperatureMax = this.roundValue(data.main.temp_max),
                        _wind = this.roundValue(data.wind.speed),
                        _iconClass = this.iconTable[data.weather[0].icon];

                    var _icon = '<span class="icon ' + _iconClass + ' dimmed wi"></span>';

                    var _newTempHtml = _icon + '' + _temperature + '&deg;';

                    $(this.temperatureLocation).updateWithText(_newTempHtml, this.fadeInterval);

                }.bind(this),
                error: function () {
                    //The REST call failed.
                    MagicMirror.logger.error('Failed to fetch current weather conditions');
                }.bind(this)
            });

        },

        updateForecast: function () {
            $.ajax({
                type: 'GET',
                url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.forecastEndpoint,
                data: weather.params,
                success: function (data) {

                    var _opacity = 1,
                        _forecastHtml = '<tr>',
                        _forecastHtml2 = '<tr>',
                        _forecastHtml3 = '<tr>',
                        _forecastHtml4 = '<tr>';

                    _forecastHtml = '<table class="forecast-table"><tr>';

                    for (var i = 0, count = data.list.length; i < count; i++) {

                        var _forecast = data.list[i];

                        if (this.orientation == 'vertical') {
                            _forecastHtml2 = '';
                            _forecastHtml3 = '';
                            _forecastHtml4 = '';
                        }

                        _forecastHtml += '<td style="opacity:' + _opacity + '" class="day">' + moment(_forecast.dt, 'X').format('ddd') + '</td>';
                        _forecastHtml2 += '<td style="opacity:' + _opacity + '" class="icon-small ' + this.iconTable[_forecast.weather[0].icon] + '"></td>';
                        _forecastHtml3 += '<td style="opacity:' + _opacity + '" class="temp-max">' + this.roundValue(_forecast.temp.max) + '&deg;</td>';
                        _forecastHtml4 += '<td style="opacity:' + _opacity + '" class="temp-min">' + this.roundValue(_forecast.temp.min) + '&deg;</td>';

                        //No. Just....no.
                        //_opacity -= 0.155;

                        if (this.orientation == 'vertical') {
                            _forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 + '</tr>';
                        }
                    }
                    _forecastHtml += '</tr>',
                        _forecastHtml2 += '</tr>',
                        _forecastHtml3 += '</tr>',
                        _forecastHtml4 += '</tr>';

                    if (this.orientation == 'vertical') {
                        _forecastHtml += '</table>';
                    } else {
                        _forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 + '</table>';
                    }

                    $(this.forecastLocation).updateWithText(_forecastHtml, this.fadeInterval);

                }.bind(this),
                error: function () {
                    MagicMirror.logger.error('Failed to fetch forecast weather conditions');
                }
            });
        },

        init: function () {
            if (!this.params.lang) {
                this.params.lang = this.lang;
            }

            if (!this.params.cnt) {
                this.params.cnt = 6;
            }

            this.intervalId = setInterval(function () {
                this.updateCurrentConditions();
                this.updateForecast();
            }.bind(this), this.updateInterval);
            this.updateCurrentConditions();
            this.updateForecast();
        }
    };

    function ms2Beaufort(ms) {
        var kmh = ms * 60 * 60 / 1000;
        var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
        for (var beaufort in speeds) {
            var speed = speeds[beaufort];
            if (speed > kmh) {
                return beaufort;
            }
        }
        return 12;
    }

    MagicMirror.weather = weather;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});

