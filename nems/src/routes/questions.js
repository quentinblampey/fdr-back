var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Question = require("../models/Question");
var User = require("../models/User.js");
var construct = require("../models/Question.construct");

/*
  Role    | Get all the questions.
  Params  | None
  Body    | None
  Returns | The questions.
*/

router.get("/", function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});

/*
  Role    | Find the next question to be asked. 
  Params  | id : id of the user.
  Body    | None
  Returns | question : the question, isFinish : true is the chat is done for this session, user : the user
*/

router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user.currentBreak.length == 0) {
      // The chat is done
      user.currentBreak = user.nextBreak.reverse(); // Get the questions to ask in the future chat session.
      user.nextBreak = [];
      user.save();
      res.json({ question: {}, isFinish: true, user: user });
    } else {
      idQ = user.currentBreak[user.currentBreak.length - 1]; // Get the id pf the question we want
      user.save();
      Question.findOne({ idQ: idQ }, function(err, question) {
        // Get the question we want
        if (err) return next(err);
        if (question.personalized) {
          question = construct(question, user.details);
        }
        res.json({ question: question, isFinish: false, user: user });
      });
    }
  });
});

module.exports = router;
