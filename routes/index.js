const express = require('express');
const router = express.Router();
const auth = require('./auth');

const isAuthenticated = require('../middlewares/auth').isAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(auth);
router.use(isAuthenticated);

// here goes the protected routes
router.get('/2', (req, res, next) => {
  res.render('index', { title: 'Protected' });
});

module.exports = router;
