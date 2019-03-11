/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const RdvSchema = new mongoose.Schema({
  idU: String,
  horaire: String
});

module.exports = mongoose.model("Rdv", RdvSchema);
