/* eslint-disable no-magic-numbers */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const updateScore = require("./updateScore").updateScore;
const fidelity = require("./updateScore").fidelity;
const saveScore = require("./updateScore").saveScore;

/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.post("/initget", function(req, res, next) {
  const pseudo = req.body.pseudo.toLowerCase();
  User.findOne({ pseudo: pseudo }, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post === null) {
      firstTrees = [80, 79, 77, 72, 68, 63, 57, 48, 47, 34, 18, 13, 1];
      nextTrees = [50];
      User.create(
        {
          pseudo: pseudo,
          helped: false,
          registration: Date.now().toString(),
          numberQuestions: 0,
          numberChats: [],
          aide: false,
          aideMessage: "",
          currentBreak: firstTrees,
          caracteristics: {
            athlete: false,
            disabled: false,
            employe: false,
            artist: false
          },
          nextBreak: nextTrees,
          details: { name: "undefined" }
        },
        function(err, post) {
          if (err) return next(err);
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

/* AIDE BY ID */
router.post("/aide/:id/:help", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }

    user.aide = true;

    try {
      user.aideMessage = req.body.message;
    } catch (error) {
      user.aideMessage = "Pas de message de l'étudiant.";
    }

    user.save();

    res.json(user);
  });
});

/* HELP USER */
router.post("/help/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, users) {
    if (err) {
      return next(err);
    }
    users.helped = true;
    users.save();

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

/* FILTER BY HELPED */

router.get("/helped", function(req, res, next) {
  var queryParam = {};
  queryParam["helped"] = true;
  User.find(queryParam, function(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
});

/* FILTER AND SORT USERS */

router.post("/filter", function(req, res, next) {
  var queryFilter = {};
  var querySort = {};
  queryFilter["helped"] = false;
  req.body.filter.forEach(filter => {
    queryFilter["caracteristics." + filter.toString()] = true;
  });
  if (req.body.filterHelp) {
    queryFilter["aide"] = true;
  }
  req.body.sortScore.forEach(param => {
    querySort["score." + param.toString()] = 1;
    queryFilter["score." + param.toString()] = { $gt: 0 };
  });
  req.body.sort.forEach(param => {
    querySort[param.toString()] = 1;
    queryFilter[param.toString()] = { $gt: 0 };
  });
  User.find(queryFilter, null, { sort: querySort }, function(err, users) {
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
    res.json(user);
  });
});

/* SAVE USER SCORES */

router.put("/save_scores", function(req, res, next) {
  User.find({}, (err, users) => {
    users.forEach(user => {
      saveScore(user);
      user.save();
    });
  });
});

router.put("/clear", function(req, res, next) {
  User.deleteMany({}, (err, users) => {
    res.send(users);
  });
});

module.exports = router;
