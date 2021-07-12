// PassportJS for user authentication
const passport = require('../config/passport');

// Get sign in page
exports.signin_get = (req, res) => {
  res.render('signin');
};

// If sign in successful, redirect to home page
// If unsuccessful, redirect to signup page
exports.signin_post = passport.authenticate('local', {
  successRedirect: "../",
  failureRedirect: "../signup",
});

