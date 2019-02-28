const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  registration: Date,
  pseudo: String,
  currentBreak: [Number],
  nextBreak: [Number],
  details: {
    name: String,
    sportBeforeComing: String,
    sportNow: String,
    clubFound: String,
    sportNowIsFun: String
  },
  numberChats: [String],
  numberQuestions: Number,
  caracteristics: {
    athlete: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    employe: { type: Boolean, default: false },
    artist: { type: Boolean, default: false },
    biBachelor: { type: Boolean, default: false }
  },
  score: {
    motivation: { type: Number, default: -1 },
    fidelity: { type: Number, default: -1 },
    lifestyle: { type: Number, default: -1 },
    integration: { type: Number, default: -1 },
    noOrientation: { type: Number, default: -1 }
  }
});

module.exports = mongoose.model("User", UserSchema);
