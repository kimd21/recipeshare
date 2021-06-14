const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  res.render('profile');
});

module.exports = router;