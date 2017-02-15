const express = require('express');
const router = express.Router();
const auth = require('./auth');
const shows = require('./shows');
const episodes = require('./episodes');

const isAuthenticated = require('../middlewares/auth').isAuthenticated;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { isAuthenticated: req.isAuthenticated() });
});

router.use(auth);
router.use(isAuthenticated);
router.use('/shows/', shows);
router.use('/', episodes);

// here goes the protected routes
router.get('/2', (req, res, next) => {
  res.render('index', { title: 'Protected' });
});

module.exports = router;
