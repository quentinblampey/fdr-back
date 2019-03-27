var mongoose = require("mongoose");

/*
Stores all the answers possible for all the questions.
*/
var AnswerSchema = new mongoose.Schema({
  idQ: Number, // Id of the question the answer is linked to.
  body: String, // Body text of the question.
  reaction: String, // Body text of the reaction of the chatbot to this response.
  breakPoint: Boolean, // If this answer leads to a breakpoint in the tree of the questions.
  detail: String // Detail of the answer
});

/*
EXAMPLE : 
{
  idQ: 12,
  body: "Oui, je vais bien",
  reaction: "Je suis content que tu ailles bien!",
  breakPoint: false,
  detail: "oui"
}
*/

/*
Export for the question schema
*/
module.exports = AnswerSchema;
