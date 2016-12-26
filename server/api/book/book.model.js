'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  publisher: String,
  author: String,
  count: {type: Number, min: 0},
  date: {type: Date,default: Date.now}
});

module.exports = mongoose.model('Book', BookSchema);