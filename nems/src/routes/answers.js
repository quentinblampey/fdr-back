var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User.js");
var Answer = require("../models/Answer.js");
const updateScore = require("./updateScore").updateScore;
var nQ = 25;

/* SEND ANSWERS */

router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    } else{
      var promise1 = new Promise(function(resolve, reject) {
      user.currentBreak.pop();
      user.numberQuestions = user.numberQuestions + 1;
      user.completion = Math.min((user.numberQuestions / nQ) * 100, 100);
      answer = req.body.answer;
      if (req.body.field) {
        if (req.body.field == "hautNiveau") {
          if (answer.detail == "1") {
            user.caracteristics.artist = true;
          } else if (answer.detail == "2") {
            user.caracteristics.athlete = true;
          }
        } else if (req.body.field == "employe") {
          user.caracteristics.employe = true;
        } else if (req.body.field == "disabled") {
          if (answer.detail == "oui") {
            user.caracteristics.disabled = true;
          }
        } else if (req.body.field == "helpMessage"){
          user.aide = true;
          user.aideMessage = answer.body;
        } else if(req.body.field == "plusMoins" || req.body.field == "won"){
          user.details.numberToGuess = Math.floor(100*Math.random());
        }  else{
          user.details[req.body.field] = answer.detail;
        }
      }
      if (answer.idQ != 0) {
        if (answer.breakPoint) {
          user.nextBreak.push(answer.idQ);
        } else {
          if (answer.idQ === -1){
            console.log(answer.body, user.details.numberToGuess, answer.body === user.details.numberToGuess)
            if (parseInt(answer.body) === parseInt(user.details.numberToGuess)){
              user.currentBreak.push(154);
            }else if (answer.body > user.details.numberToGuess){
              user.currentBreak.push(153);
            }else{
              user.currentBreak.push(152);
            }
          }else{
            user.currentBreak.push(answer.idQ);
          }
        }
      }
      updateScore(user);
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
