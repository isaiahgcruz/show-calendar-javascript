const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Show = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },

  apiId: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Show', Show);
