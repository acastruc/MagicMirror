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
        fetchNewsIntervalId: null,

        init: function () {
            MagicMirror.logger.info("Reading data from:" + this.feed);

            this.fetchNews();
            this.intervalId = setInterval(function () {
                this.showNews();
            }.bind(this), this.updateInterval);
        },

        fetchNews: function () {
            parseRSS(this.feed, function (data) {
                MagicMirror.logger.info("Received rss data");
                MagicMirror.logger.info(data);
                this.currentItem = 0;
                this.newsItems = data.entries;
            }.bind(this));
        },

        showNews: function () {
            var item = '';
            if(this.currentItem < this.newsItems.length) {
                item = this.newsItems[this.currentItem].title;
                this.currentItem = (this.currentItem+1) % this.newsItems.length;
            }
            $(this.newsLocation).updateWithText('Breaking News: ' + item, this.fadeInterval);
        },
        toggle: function () {
            $(this.newsLocation).toggle();
        }
    };

    function parseRSS(url, callback) {
        var rss_url = document.location.protocol
                    + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='
                    + encodeURIComponent(url);
        MagicMirror.logger.info(rss_url);

        $.ajax({
            url: rss_url,
            dataType: 'json',
            success: function(data) {
                if (data.responseData && data.responseData.feed) {
                    callback(data.responseData.feed);
                } else {
                    callback([{title: 'Study shows reading headlines makes you smarter'},
                              {title: 'Local sports team competes against visiting team; good time had by all'}]);
                }

            }
        });
    }

    MagicMirror.rss = rss;

})(jQuery, window.MagicMirror =  window.MagicMirror || {});