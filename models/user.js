const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  googleId: String,
  name: String,

  shows: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
});

module.exports = mongoose.model('User', User);
