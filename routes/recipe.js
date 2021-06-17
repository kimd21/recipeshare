const express = require('express');
const upload = require('../config/upload');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

// Create a new recipe
router.get('/create', recipeController.recipe_create_get);

router.post('/create', upload.single('file'), recipeController.recipe_create_post);

router.get('/:id', recipeController.recipe_detail);

// router.get('/:id/update', recipeController.recipe_update_get);

// router.post('/:id/update', recipeController.recipe_update_post);

// router.get('/:id/delete', recipeController.recipe_delete_get);

// router.post('/:id/delete', recipeController.recipe_delete_post);

module.exports = router;