const express = require('express');
const router = express.Router();
const auth = require('./auth');
const shows = require('./shows');
const episodes = require('./episodes');
const users = require('./users');
const calendars = require('./calendars');

const isAuthenticated = require('../middlewares/auth').isAuthenticated;


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Calendar', isAuthenticated: req.isAuthenticated() });
});

router.use(auth);
router.use('/api/users/', users);
router.use(isAuthenticated);
router.use('/api/shows/', shows);
router.use('/api/episodes/', episodes);
router.use('/api/calendars', calendars);

// here goes the protected routes
router.get('/2', (req, res, next) => {
  res.render('index', { title: 'Protected' });
});

module.exports = router;
