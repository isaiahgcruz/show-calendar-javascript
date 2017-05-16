const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
