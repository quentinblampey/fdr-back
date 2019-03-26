var mongoose = require("mongoose");

var EngagementSchema = new mongoose.Schema({
  date: { type: String, default: "" },
  student: { type: String, default: "" },
  teacher: { type: String, default: "" },
  isValidated: { type: Boolean, default: false },
  contact: {type: String, default: ""}
});

module.exports = {
  routing: mongoose.model("Engagement", EngagementSchema),
  schema: EngagementSchema
};