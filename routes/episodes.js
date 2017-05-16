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
    url = user.shows.map(show => ({ url: `http://api.tvmaze.com/shows/${show.apiId}/episodes`, title: show.title }));
    const episodes = [];
    const q = async.queue((task, done) => {
      request(task.url, (err, response, body) => {
        if (err) return done(err);
        showsEpisodes = JSON.parse(body);
        latestSeason = showsEpisodes[showsEpisodes.length - 1].season;
        latestSeasonEpisodes = showsEpisodes
          .filter((el) => {
            if (el.season == latestSeason) {
              return el;
            }
          })
          .map(el => ({ title: `S${(`0${el.season}`).slice(-2)}E${(`0${el.number}`).slice(-2)} ${task.title}`, timestamp: el.airstamp }));
        episodes.push(...latestSeasonEpisodes);
        done();
      });
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
