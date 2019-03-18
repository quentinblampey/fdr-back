/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const CreneauSchema = new mongoose.Schema({
  open: Boolean,
  decided: Boolean,
  duration: Number,
  numberTot: Number,
  plage: [{ horaire: String, nbCreneaux: Number }],
  list: [{ horaire: String, idCren: Number }],
  asked: [{ idCren: [Number], idU: String, horaire: String }]
});

module.exports = mongoose.model("Creneau", CreneauSchema);
