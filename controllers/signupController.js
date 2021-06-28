const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {body, validationResult} = require('express-validator');

exports.signup_get = (req, res) => {
  res.render('signup');
}

exports.signup_post = (req, res, next) => {
  // Body sanitization
  body('firstName', 'First name must not be empty').trim().isLength({min: 1}).escape();
  body('lastName', 'Last name must not be empty').trim().isLength({min: 1}).escape();
  body('username', 'Username must not be empty').trim().isLength({min: 1}).escape();
  body('password', 'Password must must not be empty').trim().isLength({min: 1}).escape();
  
  // Encrypt password with BcryptJS hashing
  bcrypt.hash(req.body.password, 10, (err, hashpw) => {
    if (err) {
      next(err);
    };
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashpw,
      status: 'free'
    }).save(err => {
      if (err) {
        return next(err);
      };
      res.redirect("../");
    });
  });
}