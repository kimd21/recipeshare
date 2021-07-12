const express = require('express');
const router = express.Router();

// Get about page
router.get('/', function(req, res, next) {
  res.render('about', {title: 'About'});
});

module.exports = router;