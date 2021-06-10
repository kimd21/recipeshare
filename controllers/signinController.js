const passport = require('../config/passport');

exports.signin_get = (req, res) => {
  res.render('signin');
};

exports.signin_post = passport.authenticate('local', {
  successRedirect: "../",
  failureRedirect: "../signup",
});

