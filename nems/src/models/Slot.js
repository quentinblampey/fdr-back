var mongoose = require("mongoose");

var SlotSchema = new mongoose.Schema({
  idU: String,
  date: String,
  duration: Number,
  affectation: { type: String, default: "" }
});

module.exports = mongoose.model("Slot", SlotSchema);
