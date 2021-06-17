const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController.js');

// Get image
router.get('/:filename', imageController.image_get);

module.exports = router;
