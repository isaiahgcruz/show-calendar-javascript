const express = require('express');
const router = express.Router();
const Show = require('../models/show');
const User = require('../models/user');

/**
 * Show the user's shows
 */
router.get('/', (req, res, next) => {
  User.findById(req.user._id).populate('shows').exec((err, user) => {
    res.json(user.shows);
  });
});

/**
 * Add a show to the user
 */
router.post('/', (req, res, next) => {
  Show.findOne({ apiId: req.body.showId }, (err, show) => {
    if (!show) {
      show = new Show({
        apiId: req.body.showId,
        title: req.body.title,
      });
      show.save();
    }
    User.update({ _id: req.user._id }, { $addToSet: { shows: show._id } }, {}, (err, ret) => {
      res.json(ret);
    });
  });
});

/**
 * Delete a show to the user
 */
router.delete('/:showId', (req, res, next) => {
  User.update({ _id: req.user._id }, { $pull: { shows: req.params.showId } }, {}, (err, ret) => {
    res.json(ret);
  });
});

module.exports = router;
