const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

const async = require('async');
const {body, validationResult} = require('express-validator');

exports.recipe_create_get = function(req, res) {
  res.render('recipe_create');
};

