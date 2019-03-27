const mongoose = require("mongoose");
var engagement = require("./Engagement").schema;

/*
The most important schema.
It contains all the users and their personnal data.
*/
const UserSchema = new mongoose.Schema({
  textContrat: String,
  registration: Date, // The date of the first connection of the user.
  pseudo: String, // The Email adress of the user. Is used as the user ID in the front.
  currentBreak: [Number], // List of id of the questions that have to be asked during the current chat.
  nextBreak: [Number], // List of id of the questions that have to be asked during the next chat.
  completion: Number, // Percentage of completion of the initial chat.
  engagements: { type: [engagement], default: [] }, // The list of engagements of this user, imported from "Engagements.js".
  aide: { type: Boolean, default: false }, // If the student requested for help or not.
  aideMessage: String, // The message the student joined to his help request.
  currentSlot: { type: String, default: "" }, // The ID of the next RDV slot of this user.
  chosenSlots: { type: [String], default: [] }, // The IDs of the slots the user is currently applying to.
  passedSlots: { type: [String], default: [] }, // The IDs of the previous RDVs this user had.
  helped: Boolean, // If the teacher wishes to propose a RDV to this user or not.
  /*
  The details that are updated afetr each answer to the chatbot.
  */
  details: {
    name: String, // First and last name of the user.
    sportBeforeComing: String,
    sportNow: String,
    clubFound: String,
    sportNowIsFun: String,
    firstYear: String,
    motivation: String,
    whyMotivation: String,
    extMotivation: String,
    whyWorks: String,
    helpMotivation: String,
    changeOrientation: String,
    newCity: String,
    foreigner: String,
    frenchLevel: String,
    backHomeFrequency: String,
    missingHome: String,
    integration: String,
    futur: String,
    knownPerson: String,
    newFriend: String,
    friendsOk: String,
    house: String,
    houseOk: String,
    parentsOk: String,
    whyNotParentsOk: String,
    changeHome: String,
    timeToFac: String,
    whyNotHouseOk: String,
    nbRoomMates: String,
    timeWithFriend: String,
    timetoFacToLong: String,
    timeWithExtra: String,
    timeWork: String,
    manageTime: String,
    sleep: String,
    disabled: String,
    disease: String,
    whyDiscuss: String,
    whyChatbot: String,
    whyChatbotArea: String,
    ChatbotWorks: String,
    whyNotChatbotWorks: String,
    favoriteType: String,
    presenceTD: String,
    justifAbsenceTD: String,
    objectifPresenceTD: String,
    presenceTD: String,
    atteinteObjectifsTD: String,
    notesCours: String,
    travailGroupe: String,
    repriseTD: String,
    examPrep: String,
    usefulWork: String,
    homeWorkConditions: String,
    buWork: String,
    medPrev: String,
    foodCrous: String,
    employe: String,
    employeTime: String,
    hautNiveau: String,
    hautNiveauDeclar: String,
    familyResponsibility: String,
    familyResponsibilityDanger: String,
    asso: String,
    whyNotAsso: String,
    whyNotAcceptedAsso: String,
    numberToGuess: Number,
    steps: Number
  },
  numberChats: { type: [String], default: [] },
  numberQuestions: Number, // The number of questions the user answered to.
  caracteristics: {
    // If the student has particularities.
    athlete: { type: Boolean, default: false }, // If he is "sportif de haut niveau".
    disabled: { type: Boolean, default: false }, // If he is "en situation de hadicap".
    employe: { type: Boolean, default: false }, // If he is "employé".
    artist: { type: Boolean, default: false }, // If he is "artiste de haut niveau".
    foreigner: { type: Boolean, default: false } // If he is "étudiant étrager".
  },
  score: {
    // The score of the user in each of the 5 criterion.
    motivation: { type: Number, default: -1 },
    fidelity: { type: Number, default: -1 },
    lifestyle: { type: Number, default: -1 },
    integration: { type: Number, default: -1 },
    noOrientation: { type: Number, default: -1 },
    mean: { type: Number, default: -1 } // The average of the 5 scores
  },
  historicScores: {
    // Historic of the previous scores of the user, for tracking purposes.
    motivation: { type: [Number], default: [] },
    fidelity: { type: [Number], default: [] },
    lifestyle: { type: [Number], default: [] },
    integration: { type: [Number], default: [] },
    noOrientation: { type: [Number], default: [] }
  },
  ue: [] // The list if each UE the student has taken.
});

module.exports = mongoose.model("User", UserSchema);
