var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  googleId: {
  },
});

module.exports = mongoose.model('User', User);