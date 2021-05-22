const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController.js');

router.get('/', signinController.signin_get);
router.post('/', signinController.signin_post);

module.exports = router;