var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  pseudo: String,
  currentBreak : [Number],
  nextBreak : [Number],
  details: {name:String, sportBeforeComing:String,sportNow:String,clubFound:String,sportNowIsFun:String},
});

module.exports = mongoose.model('User', UserSchema);