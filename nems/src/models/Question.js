var mongoose = require("mongoose");
var answer = require("./Answer");

/*
Shema of the questions asked by the chatbot.
*/
var QuestionSchema = new mongoose.Schema({
  idQ: Number, // The id of the question, used to link the answers and to get the next question.
  body: String, // The body text of the question.
  personalized: Boolean, // If the question should include personal information (ex: student's name).
  persoBody: [String], // The fields used in the personalization process.
  answers: [answer], // All the answers imported from "Answers.js".
  field: String, // The field updated by this question.
  textArea: Boolean // If this question should lead to a free texxt area or not.
});

/*
Export for the router.
*/
module.exports = mongoose.model("Question", QuestionSchema);
