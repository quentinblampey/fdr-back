var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  registration : Date,
  pseudo: String,
  currentBreak : [Number],
  nextBreak : [Number],
  details: {name:String, sportBeforeComing:String,sportNow:String,clubFound:String,sportNowIsFun:String},
  numberChats : [Date],
  numberQuestions : Number,
  score: {motivation: Number, fidelity: Number, lifestyle: Number, integration: Number, noOrientation: Number}
});

module.exports = mongoose.model('User', UserSchema);