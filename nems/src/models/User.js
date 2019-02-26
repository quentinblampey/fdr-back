var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  registration : Date,
  pseudo: String,
  currentBreak : [Number],
  nextBreak : [Number],
  details: {name:String, sportBeforeComing:String,sportNow:String,clubFound:String,sportNowIsFun:String},
  numberChats : [String],
  numberQuestions : Number,
  score: {motivation: {type: Number, default: -1}, fidelity: {type: Number, default: -1}, lifestyle: {type: Number, default: -1}, integration: {type: Number, default: -1}, noOrientation: {type: Number, default: -1}}
});

module.exports = mongoose.model('User', UserSchema);