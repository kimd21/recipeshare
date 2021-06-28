const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User profile
const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  status: {enum: ['free', 'member']}
});

UserSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id;
  });

module.exports = mongoose.model('User', UserSchema);