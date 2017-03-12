/**
 * Created by acastrucci on 2016-03-03.
 *
 * News feeds based on rss, based on https://github.com/MichMich/MagicMirror
 */

(function ($, MagicMirror) {
    var config = MagicMirror.config;

    var rss = {
        feed: config.news.feed || null,
        newsLocation: '.news',
        newsItems: [],
        currentItem: 0,
        fetchCount: config.news.fetchCount || 10,
        _cacheBuster: Math.floor((new Date().getTime()) / 1200 / 1000),
        fetchInterval: config.news.fetchInterval || 60000,
        updateInterval: config.news.updateInterval || 6000,
        fadeInterval: 3000,
        intervalId: null,
        fetchId: null,
        fetchNewsIntervalId: null,

        init: function () {
            MagicMirror.logger.info("Reading rss data from " + this.feed);

            this.fetchNews();
            this.intervalId = setInterval(function () {
                this.showNews();
            }.bind(this), this.updateInterval);

            this.fetchId = setInterval(function () {
                MagicMirror.logger.info('Fetching fresh news data from rss feed');
                this.currentItem = 0;
                this.fetchNews();
                this.showNews();
            }.bind(this), this.fetchInterval);
        },

        fetchNews: function () {
            parseRSS(this.feed, function (data) {
                MagicMirror.logger.info("Received rss data");
                this.currentItem = 0;
                this.newsItems = data.entries;
            }.bind(this));
        },

        showNews: function () {
            var item = '';
            if(this.currentItem < this.newsItems.length) {
                item = this.newsItems[this.currentItem].title;
                this.currentItem = (this.currentItem+1) % this.newsItems.length;
                $(this.newsLocation).updateWithText(item, this.fadeInterval);
            }
        },
        toggle: function () {
            $(this.newsLocation).toggle();
        }
    };

    function parseRSS(url, callback) {
                    MagicMirror.logger.error("Failed to fetch rss data: API returning unknown format");
                    var data = {
                        entries: [
                            {title: 'Study shows reading headlines makes you smarter'},
                            {title: 'Local sports team competes against visiting team; good time had by all'},
                            {title: 'Please tell Adam to work on the rss feed code'},
                            {title: 'Isn\'t the name Donna lovely?'},
                            {title: 'Mirror on the wall says YOU are the prettiest one of all'},
                            {title: 'Lets start calling donuts "sugar bagels"'},
                            {title: 'See a penny pick it up'},
                            {title: 'Please remember to wash your hands :)'},
                            {title: 'Always never give up'},
                            {title: 'Believe in yourself'},
                            {title: 'Life\'s a journey'},
                            {title: 'You look great today!'},
                            {title: 'Engineer\'s are sexy'},
                            {title: 'Smi)e'},
                            {title: 'This mirror is fluent in over 6 million forms of communication'},
                            {title: 'Contrary to popular belief, bologna is not made from giraffe\'s neck'},
                            {title: '\'There\'s no time for science!!\' - Adam Castrucci 2016'},
                            {title: 'Paladium Iladium'},
                            {title: 'Don\'t go chasing waterfalls'},
                            {title: 'You should really think about adding more fibre to your diet'},
                            {title: '4 out of 5 guests agree, this bathroom is awesome'},
                            {title: 'Walking in the forest I found a log. Underneath it I found a stick. I thought to myself: \'that log had a baby\''},
                            {title: '\'I wanna crap a rocket\' - Ethan Castrucci 2006'},
                            {title: 'Whatever you do, don\'t cross the streams!'},
                            {title: 'May the force be with you'},
                            {title: '\'Do or do not. There is no try\' - Yoda'},
                            {title: '\'I bent my wookie!\' - Ralph Wiggum'},
                            {title: 'Mandlebaum! Mandlebaum! Mandlebaum!'}
                        ]
                    };
                    callback(data);
    };

    MagicMirror.rss = rss;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});