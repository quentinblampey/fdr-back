/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const AttributedSchema = new mongoose.Schema({
  idU: Number,
  creneau: String
});

module.exports = mongoose.model("Attributed", AttributedSchema);
