var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
const updateScore = require("./updateScore").updateScore;
var nQ = 40; // Number of questions of the first chat.

/*
  Role    | Update a user given its answer.
  Params  | id : id of the user.
  Body    | answer : answer of the user found in the question Schema, field : field that indicates where to save the answer of the user.
  Returns | The updated user.
*/

router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    // Find the user that answered the question.
    if (err) {
      return next(err);
    } else {
      var promise1 = new Promise(function(resolve, reject) {
        user.currentBreak.pop(); // Pop the last question to ask : it means he have asnwered the last question.
        user.numberQuestions = user.numberQuestions + 1; // The user answered one more question in total.
        user.completion = Math.min((user.numberQuestions / nQ) * 100, 100); // Update the completion of the first chat.
        answer = req.body.answer;
        if (req.body.field) {
          // Special answers : if the answer concerns one of theses fileds, do something special.
          if (req.body.field === "hautNiveau") {
            if (answer.detail === "1") {
              user.caracteristics.artist = true; // For exemple, here, update the caracteristics of the user.
            } else if (answer.detail === "2") {
              user.caracteristics.athlete = true;
            }
          } else if (req.body.field === "employe") {
            if (answer.detail === "1") {
              user.caracteristics.employe = true;
            }
          } else if (req.body.field === "disabled") {
            if (answer.detail === "oui") {
              user.caracteristics.disabled = true;
            }
          } else if (req.body.field === "foreigner") {
            user.caracteristics.foreigner = Boolean(answer.detail);
          } else if (req.body.field === "helpMessage") {
            user.aide = true;
            user.aideMessage = answer.body;
          } else if (
            req.body.field === "plusMoins" ||
            req.body.field === "won"
          ) {
            user.details.numberToGuess = Math.floor(100 * Math.random());
          } else {
            user.details[req.body.field] = answer.detail;
          }
        }
        if (answer.idQ != 0) {
          // If there is a question that follow the answer on the same subject.
          if (answer.breakPoint) {
            user.nextBreak.push(answer.idQ); // If the questions that follows should be asked in the next chat, add it in the next trees to visit.
          } else {
            if (answer.idQ === -1) {
              // If the question is linked to the game more or less go to the next step depending on the comparison between the right answer and the user input.
              if (
                parseInt(answer.body) === parseInt(user.details.numberToGuess)
              ) {
                user.currentBreak.push(154);
              } else if (answer.body > user.details.numberToGuess) {
                user.currentBreak.push(153);
              } else {
                user.currentBreak.push(152);
              }
            } else {
              user.currentBreak.push(answer.idQ); // Add the next question to be asked.
            }
          }
        }
        updateScore(user); // Update the indicators of the user.
        user.save();
        resolve();
      });

      promise1.then(function(value) {
        res.json(user);
      });
    }
  });
});

module.exports = router;
