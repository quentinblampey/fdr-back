var mongoose = require("mongoose");

/* 
Schema of an engagement of a student. 
*/
var EngagementSchema = new mongoose.Schema({
  date: { type: String, default: "" }, // Date of the engagement NOTE : no data validation implemented yet.
  student: { type: String, default: "" }, // Text of the engagement written by the student.
  teacher: { type: String, default: "" }, // Response to the engagement written by the Teacher.
  isValidated: { type: Boolean, default: false }, // If the engagement has been validated by the teacher yet.
  contact: { type: String, default: "" } // The contact with who the student have spoken to, in case of a "Reflexion".
});

/*
Export for the router (routing field) and for the User Schema (schema)
*/
module.exports = {
  routing: mongoose.model("Engagement", EngagementSchema),
  schema: EngagementSchema
};
