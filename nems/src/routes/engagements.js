const express = require("express");
const router = express.Router();
const Engagement = require("../models/Engagement.js").routing;
const User = require("../models/User.js");

/* Teacher validates or comments */

router.post("/validate/:idE/:idU", function(req, res, next) {
  User.findById(req.params.idU, function(err, user) {
    if (err) return next(err);
    user.engagements.forEach(engagement => {
      if (engagement._id == req.params.idE) {
        engagement.isValidated = true;
      }
    });
    res.json(user);
  });
});

router.post("/comment/:idE/:idU", function(req, res, next) {
  User.findById(req.params.idU, function(err, user) {
    if (err) return next(err);
    user.engagements.forEach(engagement => {
      if (engagement._id == req.params.idE) {
        engagement.teacher = req.body.comment;
      }
    });
    res.json(user);
  });
});

/* CREATES NEW CRENEAU FOR THIS WEEK */

router.post("/:id", function(req, res, next) {
  Engagement.create(
    {
      date: req.body.date,
      student: req.body.comment
    },
    function(err, engagement) {
      if (err) return next(err);
      User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        user.engagements.push(engagement);
        user.save();
        res.json(engagement);
      });
    }
  );
});

module.exports = router;
