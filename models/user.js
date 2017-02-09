var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  googleId: {
    required: true,
  },
});

module.exports = mongoose.model('User', User);