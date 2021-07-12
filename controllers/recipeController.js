const Recipe = require('../models/recipe.js');
const Image = require('../models/image.js');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const async = require('async');
const {body, validationResult} = require('express-validator');

// GridFS for storing images and files
const connect = mongoose.connection;
let gfs;
connect.once('open', function() {
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection('uploads');
});

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

  // Create new recipe
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
    // Save recipe to MongoDB
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

    // Create new image associated with recipe
    let newImage = new Image({
      filename: req.file.filename,
      fileId: req.file.id,
      createdAt: Date(),
      recipe: recipe._id
    });

    // Save image to MongoDB
    newImage.save(
      function(err) {
        if (err) {return next(err);}
        res.redirect(recipe.url);
      }
    );
  });

};

// Get recipe info page
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

// Get recipe update page
exports.recipe_update_get = function(req, res, next) {
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
      let err = new Error('No recipe found');
      err.status = '404';
      return next(err);
    }
    res.render('recipe_update', {recipe: results.recipe, image: results.image, errors: err});
  })
};

exports.recipe_update_post = function(req, res, next) {
  // Body sanitization
  body('title', 'Title must not be empty.').trim().isLength({min: 1}).escape();
  body('description', 'Description must not be empty.').trim().isLength({min: 1}).escape();
  body('ingredients', 'Ingredients must not be empty').notEmpty().escape();
  body('instructions', 'Instructions must not be empty').notEmpty().escape();
  const errors = validationResult(req.body);
  // Create new recipe
  let recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    user: res.locals.currentUser._id,
    _id: req.params.id
  });
  
  // Erase old image from GFS and MongoDB
  Image.findOneAndRemove({recipe: req.params.id}, function(err, image) {
    if (err) {return next(err);}
    gfs.files.findOne({filename: image.filename}, (err, file) => {
      if (err) {return next(err);}
      gfs.remove({_id: new mongoose.Types.ObjectId(file._id), root: 'uploads'}, (err) => {
        if (err) {return next(err);}
      });
    })
  });

  // Create new image
  let image = new Image({
    filename: req.file.filename,
    fileId: req.file.id,
    createdAt: Date(),
    recipe: recipe._id,
  });

  // Save new image
  image.save(
    function(err) {
      if (err) {return next(err);}
    }
  );
  
  if (!errors.isEmpty()) {
    res.render('recipe_update', {errors: errors.array()});
    return;
  } else {
    // Update with edited recipe
    Recipe.findByIdAndUpdate(req.params.id, recipe, {}, function(err, therecipe) {
        if (err) {return next(err);}
        res.redirect(therecipe.url);
    });
  };

};

// Get delete recipe page
exports.recipe_delete_get = function(req, res, next) {
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
      let err = new Error('No recipe found');
      err.status = '404';
      return next(err);
    }
    res.render('recipe_delete', {recipe: results.recipe, image: results.image, errors: err});
  });
};

// Delete recipe and its associated image from MongoDB and GridFS
exports.recipe_delete_post = function(req, res, next) {
  if (req.body.submit === 'No') {
    res.redirect(`/profile/${res.locals.currentUser.username}`);
  } else {
    Recipe.findByIdAndRemove(req.params.id, function(err) {
      if (err) {return next(err);}
    });
    Image.findOneAndRemove({recipe: req.params.id}, function(err, image) {
      if (err) {return next(err);}
      gfs.files.findOne({filename: image.filename}, (err, file) => {
        if (err) {return next(err);}
        gfs.remove({_id: new mongoose.Types.ObjectId(file._id), root: 'uploads'}, (err) => {
          if (err) {return next(err);}
        });
      })
      // Redirect to user profile page
      res.redirect(`/profile/${res.locals.currentUser.username}`); 
    });
  }
};