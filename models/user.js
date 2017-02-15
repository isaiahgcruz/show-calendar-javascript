var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  googleId: {
  },

  shows: [{ type: Schema.Types.ObjectId, ref: 'Show'}],
});

module.exports = mongoose.model('User', User);