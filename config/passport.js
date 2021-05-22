const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

passport.use('local', 
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, {message: 'Incorrect username'});
      };
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match, login
          return done(null, user);
        } else {
          // passwords do not match
          return done(null, false, {message: 'Incorrect password'});
        }
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(username, done) {
  return done(null, username);
});

module.exports = passport;
