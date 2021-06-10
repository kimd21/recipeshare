const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup_get = (req, res) => {
  res.render('signup');
}

exports.signup_post = (req, res, next) => {
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