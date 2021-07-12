const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.js');
const Image = require('../models/image.js');

// Get home page
router.get('/', function(req, res, next) {
  let filenames = [];
  let recipeUrls = [];
  // Find all recipes
  Recipe.find().exec(function(err, recipes) {
    if (err) {return next(err);}
    // If no recipes, render profile without images
    if (recipes.length === 0) {
      res.render('index', {filenames, recipeUrls});
    }
    // For each recipe, get the filename of the associated image
    recipes.forEach(recipe => {
      Image.findOne({recipe: recipe._id}).exec(function(err, image) {
        if (err) {return next(err);}
        filenames.push(image.filename);
        recipeUrls.push(recipe.url);
        // forEach is synchronous, only render after all image filenames are found
        if (filenames.length == recipes.length) {
          res.render('index', {filenames, recipeUrls});
        };
      });
    });
  });
});

module.exports = router;
