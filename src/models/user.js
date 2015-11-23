var mongoose = require('mongoose'),
    Word = require('./word.js'),
    Schema   = mongoose.Schema;

var toLower = function (v) {
  return v.toLowerCase();
};

var userSchema = new Schema({
  name: String ,
  email: { type: String, index: { unique: true }, validate: /\u0040/,  set: toLower} ,
  passwordHash: String,
  dateCreated: { type: Date, default: Date.now },
  vocabulary : [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  hardWords : [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  level: Number,
  administrator: Boolean,
  trusted: Boolean,
});

userSchema.methods.findMyArticles = function (callback) {
  return this.model('User').find({ author: this.name }, callback);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
