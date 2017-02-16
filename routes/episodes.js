const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');
const User = require('../models/user');

/**
 * Get all episodes
 */
router.get('/', (req, res, next) => {
  User.findById(req.user._id).populate('shows').exec((err, user) => {
    url = user.shows.map((show) => {
      return { url: `http://api.tvmaze.com/shows/${show.apiId}/episodes`, title: show.title }
    });
    const episodes = [];
    const q = async.queue((task, done) => {
      request(task.url, (err, response, body) => {
        if (err) return done(err);
        showsEpisodes = JSON.parse(body);
        latestSeason = showsEpisodes[showsEpisodes.length-1].season;
        latestSeasonEpisodes = showsEpisodes
          .filter((el) => {
            if (el.season == latestSeason) {
              return el;
            }
          })
          .map((el) => { return { title: `S${el.season}E${el.number} ${task.title}`, timestamp: el.airstamp } });
        episodes.push.apply(episodes, latestSeasonEpisodes)
        done();
      })
    }, 5);

    q.drain = () => {
      res.json(episodes);
    };

    q.push(url, (err) => {
      if (err) console.log(err);
    });
  });
});

module.exports = router;
