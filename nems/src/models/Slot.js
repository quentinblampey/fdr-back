var mongoose = require("mongoose");

/*
Schema of the rendez-vous taken by the student.
It is not linked to any specific teacher yet.
*/
var SlotSchema = new mongoose.Schema({
  idU: String, // The id of the user in case of a RDV directly proposed by the teacher
  date: String, // The date of the RDV proposed.
  duration: Number, // The duration of the proposed RDV, in minutes.
  affectation: { type: String, default: "" } // The id of the user FINALLY affected to the RDV. Empty before the assignment process.
});

module.exports = mongoose.model("Slot", SlotSchema);
