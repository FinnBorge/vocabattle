var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wordSchema = new Schema({
  name: String,
  dateCreated: { type: Date, default: Date.now },
  edits: Number,
  level: Number
});

var Word = mongoose.model('Word', wordSchema);
module.exports = Word;
