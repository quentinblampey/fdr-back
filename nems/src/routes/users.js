const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const updateScore = require("./updateScore").updateScore;
const fidelity = require("./updateScore").fidelity;
const saveScore = require("./updateScore").saveScore;

/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.post("/initget", function(req, res, next) {
  console.log(req.body.pseudo);
  User.findOne({ pseudo: req.body.pseudo }, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      console.log("creating...");
      firstTrees = [58, 66, 36, 27, 13, 1];
      random1 = Math.random() <= 0.2;
      random2 = Math.random() <= 0.05;
      random3 = Math.random() <= 0.6;
      random4 = Math.random() <= 0.3;
      random5 = Math.random() <= 0.1;
      User.create(
        {
          pseudo: req.body.pseudo,
          registration: Date.now().toString(),
          numberQuestions: 0,
          numberChats: [],
          currentBreak: firstTrees,
          caracteristics: {
            athlete: random1,
            disabled: random2,
            employe: random3,
            artist: random4,
            biBachelor: random5
          },
          nextBreak: [],
          details: {}
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
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* GET ALL USERS SORTED ACCORDING TO FILTER */

router.get("/sorted/:filter", function(req, res, next) {
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
  var queryParam = {};
  queryParam["score." + req.params.filter.toString()] = 1;
  User.find({}, null, { sort: queryParam }, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* GET ALL USERS HAVING THE CARACTERISTIC FILTER */

router.get("/sorted/caracteristics/:filter", function(req, res, next) {
  var queryParam = {};
  queryParam["caracteristics." + req.params.filter.toString()] = true;
  User.find(queryParam, function(err, users) {
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

/* SAVE USER SCORES */

router.put("/save_scores", function(req, res, next) {
  console.log("Saving scores");
  User.find({}, (err, users) => {
    users.forEach(user => {
      saveScore(user);
      user.save();
    });
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
