/**
 * Created by acastrucci on 2016-03-03.
 */

(function ($, MagicMirror) {

    var config = {
        lang: 'en',
        fadeInterval: 1000,
        time: {
            timeFormat: 12,
            displaySeconds: true,
            digitFade: false,
        },
        voicecontrol: {
            startListeningOnLoad: false
        },
        debug: {
            showLogging: false
        },
        spirit: {
            //url: 'http://www.dionlabel.com/tl_files/Blog_Photos/Magic_Mirror_SnowWhite.jpg',
            //url: 'img/mim.png',
            url: 'https://media.giphy.com/media/ghp9BRdISexSU/giphy.gif',
            caption: 'Your command?',
            fadeInterval: 2000
        },
        weather: {
            interval: 60000, //60s between updates
            params: {
                q: 'Ottawa, Canada',
                units: 'metric',
                lang: 'en',
                APPID: '18cd31da432b3ef6eb76f2301dc1235c'
            }
        },
        compliments: {
            interval: 30000,
            fadeInterval: 4000,
            morning: [
                'Good morning Adam!',
                'Have a great day!',
                'How was your sleep?'
            ],
            afternoon: [
                'What are you doing, Dave?',
                'You look great!',
                'I am afraid I cant allow you to do that Dave'
            ],
            evening: [
                'Wow I have become sentient!',
                'I have been programmed to speak soothing phrases',
                'DESTROY! DESTROY!'
            ]
        },

        smalltalk: {
            phrases: [],
            responses: []
        },

        xkcd: {
            fadeInterval: 6000
        },
        news: {
            feed: 'http://rss.slashdot.org/Slashdot/slashdot',
            //feed: 'http://rss.cbc.ca/lineup/canada.xml',
            fetchInterval: 60*1000*30, //30minutes
            updateInterval: 15000,
            fetchCount: 10
        }
    };

    MagicMirror.config = config;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});