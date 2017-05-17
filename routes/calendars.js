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

/**
 * Save events to a calendar
 */
router.post('/', (req, res) => {
  const gCalendar = new gcal.GoogleCalendar(req.user.accessToken);
  const payLoad = {
    summary: req.body.calendar,
  };

  gCalendar.calendars.insert(payLoad, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.json(data);
  });
});

module.exports = router;
