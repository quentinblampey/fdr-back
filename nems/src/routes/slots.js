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
  });
});

/* GETS ALL THE FREE SLOTS OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/getfree", function(req, res, next) {
  Slot.find({ affectation: "" }, function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
  });
});

router.get("/:id", function(req, res, next) {
  Slot.findById(req.params.id, function(err, slot) {
    if (err) {
      return next(err);
    }
    res.json(slot);
  });
});

router.get("/TbAa3CpZXgS1apnKjCnj3VdnkIxMhlny/clear", function(req, res, next) {
  Slot.deleteMany({}, (err, slots) => {
    res.send(slots);
  });
});

router.delete("/TbAa3CpZXgS1apnKjCnj3VdnkIxMhlny/clear/:id", function(
  req,
  res,
  next
) {
  Slot.deleteOne({ _id: req.params.id }, (err, slot) => {
    if (err) {
      return next(err);
    }
    res.send(slot);
  });
});

module.exports = router;
