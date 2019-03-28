const express = require("express");
const router = express.Router();
const Engagement = require("../models/Engagement.js").routing;
const User = require("../models/User.js");

/*
  Role    | A teacher validates an engagement.
  Params  | idE : id of the engagement, idU : id of the user.
  Body    | None
  Returns | The updated user.
*/

router.post("/validate/:idE/:idU", function(req, res, next) {
  User.findById(req.params.idU, function(err, user) {
    if (err) return next(err);
    user.engagements.forEach(engagement => {
      if (String(engagement._id) === String(req.params.idE)) {
        engagement.isValidated = true;
      }
    });
    user.save();
    res.json(user);
  });
});

/*
  Role    | A teacher comments an engagement.
  Params  | idE : id of the engagement, idU : id of the user.
  Body    | comment : the comment
  Returns | The updated user.
*/

router.post("/comment/:idE/:idU", function(req, res, next) {
  User.findById(req.params.idU, function(err, user) {
    if (err) return next(err);
    user.engagements.forEach(engagement => {
      if (String(engagement._id) === String(req.params.idE)) {
        engagement.teacher = req.body.comment;
      }
    });
    user.save();
    res.json(user);
  });
});

/*
  Role    | Create an engagement.
  Params  | id : id of the user.
  Body    | date : date of the engagement, student : comment of the student, contact : contact of the student during the engagement
  Returns | The new engagement.
*/

router.post("/:id", function(req, res, next) {
  Engagement.create(
    {
      date: req.body.date,
      student: req.body.student,
      contact: req.body.contact
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
