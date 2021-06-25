const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.js');
const Image = require('../models/image.js');

router.get('/:id', function(req, res, next) {
  let filenames = [];
  let recipeUrls = [];
  // If no recipes, render profile without images
  Recipe.count(function(err, count) {
    if (!err && count === 0) {
      res.render('profile', {filenames, recipeUrls});
    }
  });

  // Find all recipes owned by user
  Recipe.find().where({user: res.locals.currentUser._id}).exec(function(err, recipes) {
    if (err) {return next(err);}
    // For each recipe, get the filename of the associated image
    recipes.forEach(recipe => {
      Image.findOne({recipe: recipe._id}).exec(function(err, image) {
        if (err) {return next(err);}
        filenames.push(image.filename);
        recipeUrls.push(recipe.url);
        // forEach is synchronous, only render after all image filenames are found
        if (filenames.length == recipes.length) {
          res.render('profile', {filenames, recipeUrls});
        };
      });
    });
  });
});

module.exports = router;