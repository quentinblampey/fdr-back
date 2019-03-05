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
    sportNowIsFun: String,
    timeToFac: String,
    houseOk: String,
    motivation: String,
    whyMotivation: String,
    whyWorks: String,
    helpMotivation: String,
    newCity: String,
    changeOrientation: String,
    integration: String,
    futur: String,
    knownPerson: String,
    newFriend: String,
    friendsOk: String,
    house: String,
    timeToFac: String,
    whyNotHouseOk: String,
    nbRoomMates: String,
    timeWithFriend: String,
    timetoFacToLong: String,
    timeWithExtra: String,
    timeWork: String,
    disease: String,
    presenceTD: String,
    justifAbsenceTD: String,
    objectifPresenceTD: String,
    presenceTD: String,
    atteinteObjectifsTD: String,
    notesCours: String,
    travailGroupe: String,
    repriseTD: String,
    employe: String,
    employeTime: String,
    hautNiveau: String,
    artHautNiveau: String
  },
  numberChats: [String],
  numberQuestions: Number,
  caracteristics: {
    athlete: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    employe: { type: Boolean, default: false },
    artist: { type: Boolean, default: false }
  },
  score: {
    motivation: { type: Number, default: -1 },
    fidelity: { type: Number, default: -1 },
    lifestyle: { type: Number, default: -1 },
    integration: { type: Number, default: -1 },
    noOrientation: { type: Number, default: -1 }
  },
  historicScores: {
    motivation: { type: [Number], default: [] },
    fidelity: { type: [Number], default: [] },
    lifestyle: { type: [Number], default: [] },
    integration: { type: [Number], default: [] },
    noOrientation: { type: [Number], default: [] }
  }
});

module.exports = mongoose.model("User", UserSchema);
