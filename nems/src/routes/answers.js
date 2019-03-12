var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User.js");
var Answer = require("../models/Answer.js");
const updateScore = require("./updateScore").updateScore;
var nQ = 25;
/*
GET ALL ANSWERS

router.get("/", function(req, res, next) {
  Answer.find(function(err, answers) {
    if (err) return next(err);
    res.json(answers);
  });
});

SAVE Answer 

router.post('/', function(req, res, next) {
  Answer.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

/* SEND ANSWERS */

router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    } else{
      var promise1 = new Promise(function(resolve, reject) {
        console.log(user.currentBreak);
      user.currentBreak.pop();
      console.log(user.currentBreak);
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
          userMessage = answer.detail;
        }else {
          user.details[req.body.field] = answer.detail;
        }
      }
      if (answer.idQ != 0) {
        if (answer.breakPoint) {
          user.nextBreak.push(answer.idQ);
        } else {
          user.currentBreak.push(answer.idQ);
        }
      }
      console.log("Updating stats...");
      updateScore(user);
      user.save();
      console.log(user.currentBreak);
      resolve();
      });
      
      promise1.then(function(value) {
        res.json(user);
      });
    }
  });
});

/*
UPDATE Answer

router.put("/:id", function(req, res, next) {
  Answer.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

DELETE Answer

router.delete("/:id", function(req, res, next) {
  Answer.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

module.exports = router;
