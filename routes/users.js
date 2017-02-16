var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
