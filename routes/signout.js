const express = require('express');
const router = express.Router();

// Sign out user with PassportJS then redirect to home page
router.get('/', function(req, res, next) {
  req.logout();
  res.redirect('../');
});

module.exports = router;