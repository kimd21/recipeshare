const Recipe = require('../models/recipe.js');
const Image = require('../models/image.js');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const async = require('async');
const {body, validationResult} = require('express-validator');

exports.recipe_create_get = function(req, res) {
  res.render('recipe_create');
};

exports.recipe_create_post = function(req, res, next) {
  // Body sanitization
  body('title', 'Title must not be empty.').trim().isLength({min: 1}).escape();
  body('description', 'Description must not be empty.').trim().isLength({min: 1}).escape();
  body('ingredients', 'Ingredients must not be empty').notEmpty().escape();
  body('instructions', 'Instructions must not be empty').notEmpty().escape();
  const errors = validationResult(req.body);
  let recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    user: res.locals.currentUser._id
  });

  if (!errors.isEmpty()) {
    res.render('recipe_create', {errors: errors.array()});
    return;
  } else {
    recipe.save(
      function (err) {
        if (err) {return next(err);}
    });
  }

  // Check for existing images
  Image.findOne({fileId: req.file.id}).then((image) => {
    if (image) {
      return res.status(200).json({
        success: false,
        message: 'Image already exists'
      });
    }

    let newImage = new Image({
      filename: req.file.filename,
      fileId: req.file.id,
      createdAt: Date(),
      recipe: recipe._id
    });

    newImage.save(
      function(err) {
        if (err) {return next(err);}
        res.redirect(recipe.url);
      }
    );
  });

};

exports.recipe_detail = function(req, res, next) {
  async.parallel({
    recipe: function(callback) {
      Recipe.findById(req.params.id).exec(callback);
    },
    image: function(callback) {
      Image.findOne({recipe: req.params.id}).exec(callback);
    }
  }, function(err, results) {
    if (err) {return next(err);}
    if (results.recipe == null) {
      let err = new Error('No recipes found');
      err.status = '404';
      return next(err);
    }  
    res.render('recipe_detail', {recipe: results.recipe, image: results.image, errors: err});
  });
};

