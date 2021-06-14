const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

// Get list of user's recipes
// router.get('/:id', recipeController.recipe_list);

// Create a new recipe
router.get('/:id/create', recipeController.recipe_create_get);

router.post('/:id/create', recipeController.recipe_create_post);

// router.get('/:id/detail', recipeController.recipe_detail);

// router.get('/:id/update', recipeController.recipe_update_get);

// router.post('/:id/update', recipeController.recipe_update_post);

// router.get('/:id/delete', recipeController.recipe_delete_get);

// router.post('/:id/delete', recipeController.recipe_delete_post);

module.exports = router;