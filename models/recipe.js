const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  ingredients: {type: [String], required: true},
  // social_links: {
  //   facebook: {type: String, required: true},
  //   instagram: {type: String, required: true},
  //   twitter: {type: String, required: true}
  // },
  instructions: {type: [String], required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

RecipeSchema
  .virtual('url')
  .get(function() {
    return '/recipe/' + this._id;
  });

module.exports = mongoose.model('Recipe', RecipeSchema);