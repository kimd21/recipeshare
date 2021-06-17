const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: {type: String, unique: true, required: true},
  fileId: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  recipe: {type: Schema.Types.ObjectId, ref: 'Recipe', required: true}
});

ImageSchema
  .virtual('url')
  .get(function() {
    return '/image/' + this.filename;
  });

module.exports = mongoose.model('Image', ImageSchema);