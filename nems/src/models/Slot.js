var mongoose = require("mongoose");

var SlotSchema = new mongoose.Schema({
  date: String,
  duration: Number,
  affection: String
});

module.exports = SlotSchema;
