var mongoose = require("mongoose");

var SlotSchema = new mongoose.Schema({
  date: String,
  duration: Number,
  affection: { type: String, default: "" }
});

module.exports = SlotSchema;
