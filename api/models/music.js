let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let config      = require('../config');
// var SALT_WORK_FACTOR = 10;

var Music = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  artist: [String],
  cover: {
    type: String,
    required: false
  },
  album: {
    type: String
  }
},{
  timestamps: true
});



module.exports = mongoose.model('Music', Music);
