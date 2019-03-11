const mongoose = require("mongoose");

const RdvSchema = new mongoose.Schema({
  idU: Number,
  horaire: String
});

module.exports = mongoose.model("Rdv", RdvSchema);
