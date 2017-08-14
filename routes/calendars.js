const express = require('express');
const google = require('googleapis');
const _ = require('lodash');

const router = express.Router();
const calendar = google.calendar('v3');

/**
 * Get all calendars
 */
router.get('/', (req, res) => {
  calendar.calendarList.list({
    userId: 'me',
  }, (err, response) => {
    if (err) console.log(err);

    res.json(response);
  });
});

/**
 * Save events to a calendar
 */
router.post('/', (req, res) => {
  // calendar.calendars
});

module.exports = router;
