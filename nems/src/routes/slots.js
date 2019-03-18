/* eslint-disable curly */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prefer-arrow-callback */

const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot.js");

/* CREATES NEW CRENEAU FOR THIS WEEK */

router.post("/", function(req, res, next) {
  Slot.create(
    {
      date: req.body.date,
      duration: req.body.duration
    },
    function(err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
});

/* GETS ALL THE SLOTS */

router.get("/", function(req, res, next) {
  Slot.find(function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
    return 0;
  });
});

/* GETS ALL THE FREE SLOTS OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/getfree/", function(req, res, next) {
  Slot.find({ affectation: "" }, function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
    return 0;
  });
});

module.exports = router;
