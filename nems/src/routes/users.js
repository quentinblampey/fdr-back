const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const updateScore = require("./updateScore").updateScore;
const fidelity = require("./updateScore").fidelity;

/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.post("/initget", function(req, res, next) {
  console.log(req.body.pseudo);
  User.findOne({ pseudo: req.body.pseudo }, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      console.log("creating...");
      firstTrees = [4, 1];
      User.create(
        {
          pseudo: req.body.pseudo,
          registration: Date.now().toString(),
          numberQuestions: 0,
          numberChats: [],
          currentBreak: firstTrees,
          nextBreak: [],
          details: { name: "", sport: "" }
        },
        function(err, post) {
          if (err) return next(err);
          console.log("Created !");
          res.json(post);
        }
      );
    } else {
      res.json(post);
    }
  });
});

/*  GET USER BY ID*/
router.get("/getid/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* GET ALL USERS */

router.get("/", function(req, res, next) {
  console.log("Will it work ??");
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* GET ALL USERS SORTED ACCORDING TO FILTER */

router.get("/sorted/:filter", function(req, res, next) {
  console.log("Will it work ??");
  var queryParam = {};
  queryParam[req.params.filter.toString()] = 1;
  User.find({}, null, { sort: queryParam }, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* GET ALL USERS SORTED BY SCORE ACCORDING TO FILTER */

router.get("/sorted/score/:filter", function(req, res, next) {
  console.log("Will it work ??");
  var queryParam = {};
  queryParam["score." + req.params.filter.toString()] = 1;
  User.find({}, null, { sort: queryParam }, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* UPDATE USER AFTER THE END OF CHAT */

router.put("/endchat/:id", function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    if (err) return next(err);
    updateScore(user);
    var date = new Date().toJSON();
    user.numberChats.push(date.toString());
    user.score.fidelity = fidelity(user);
    user.save();
    console.log("Chat is done !");
    res.json(user);
  });
});

/*
UPDATE USER AFTER SENDING AN ANSWER, NOT NECESSARY

router.put("/:id", function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    field = req.body.field;
    post.details[field] = req.body.answer.detail;
    updateScore(post);
    post.save();
    res.json(post);
  });
});

DELETE USER, NOT NECESSARY

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

module.exports = router;
