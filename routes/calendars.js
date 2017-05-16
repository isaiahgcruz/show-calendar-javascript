const express = require('express');
const gcal = require('google-calendar');
const _ = require('lodash');

const router = express.Router();

/**
 * Get all calendars
 */
router.get('/', (req, res) => {
  const gCalendar = new gcal.GoogleCalendar(req.user.accessToken);
  gCalendar.calendarList.list((err, calendarList) => {
    if (err) {
      console.log(err);
    }

    res.json(_.filter(calendarList.items, el => el.accessRole === 'owner' && !el.primary));
  });
});

module.exports = router;
