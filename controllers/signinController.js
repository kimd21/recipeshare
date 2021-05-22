const passport = require('../config/passport');

exports.signin_get = (req, res) => {
  res.render('signin', {title: 'Log In', user: req.user});
};

exports.signin_post = passport.authenticate('local', {
  successRedirect: "../",
  failureRedirect: "../signup",
});

