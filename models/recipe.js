const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB schema for individual recipes
const RecipeSchema = new Schema({
  title: {type: String, unique: true, required: true},
  description: {type: String, required: true},
  ingredients: {type: [String], required: true},
  instructions: {type: [String], required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

RecipeSchema
  .virtual('url')
  .get(function() {
    return '/recipe/' + this._id;
  });

module.exports = mongoose.model('Recipe', RecipeSchema);