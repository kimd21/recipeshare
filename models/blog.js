const mongoose = require('mongoose');
const Schema = mongoose.Schema;

BlogSchema = new Schema({
  title: {type: String, unique: true, required: true},
  blogpost: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

BlogSchema
  .virtual('url')
  .get(function() {
    return '/blog/' + this._id;
  });

module.exports = mongoose.model('Blog', BlogSchema);