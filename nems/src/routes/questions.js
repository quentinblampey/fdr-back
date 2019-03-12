var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Question = require("../models/Question");
var User = require("../models/User.js");
var construct = require("../models/Question.construct");

//GET ALL QUESTIONS

router.get("/", function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});

/* FIND A NEW QUESTION AND CHECK IF THE CHAT IS FINISH */
router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user.currentBreak.length == 0) {
      user.currentBreak = user.nextBreak;
      user.nextBreak = [];
      user.save();
      res.json({ question: {}, isFinish: true, user: user });
    } else {
      idQ = user.currentBreak[user.currentBreak.length - 1];
      user.save();
      Question.findOne({ idQ: idQ }, function(err, question) {
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
