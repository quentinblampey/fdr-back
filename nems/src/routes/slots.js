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
  let plage = req.body;
  plage.map(slot => {
    let newSlot = {
      date: slot.date,
      duration: slot.duration,
      affectation: "Libre"
    };

    Slot.create(newSlot, function(err, rdv) {
      if (err) {
        return next(err);
      }
    });
    return 0;
  });
});

/* GETS ALL THE CRENEAUX OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/", function(req, res, next) {
  Slot.find(function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
    return 0;
  });
});

/* GETS ALL THE CRENEAUX OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/getfree/", function(req, res, next) {
  Slot.find({ affectation: "Libre" }, function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
    return 0;
  });
});

module.exports = router;
