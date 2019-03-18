var mongoose = require("mongoose");

var SlotSchema = new mongoose.Schema({
  date: String,
  duration: Number,
  affectation: { type: String, default: "" }
});

module.exports = mongoose.model("Slot", SlotSchema);
