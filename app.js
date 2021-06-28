const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const methodOverride = require('method-override');

// Connect to MongoDB
const connect = mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});
connect.then(() => {
  console.log('Connected to MongoDB')
}, (err) => console.log(err));

// Establish routes
const indexRouter = require('./routes/index');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const feedbackRouter = require('./routes/feedback');
const recipeRouter = require('./routes/recipe');
const profileRouter = require('./routes/profile');
const signoutRouter = require('./routes/signout');
const imageRouter = require('./routes/image');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// PassportJS for user authentication
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Pass logged in user info to global locals object
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow usage of delete request
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/feedback', feedbackRouter);
app.use('/recipe', recipeRouter);
app.use('/profile', profileRouter);
app.use('/signout', signoutRouter);
app.use('/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
