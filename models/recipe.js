const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {type: String, unique: true, required: true},
  ingredients: {type: String, required: true},
  social_links: {
    facebook: {type: String, required: true},
    instagram: {type: String, required: true},
    twitter: {type: String, required: true}
  },
  instructions: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

RecipeSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id;
  });

module.exports = mongoose.model('Recipe', RecipeSchema);