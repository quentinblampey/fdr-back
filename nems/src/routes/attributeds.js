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
const Attributed = require("../models/Attributed");

/* CREATES NEW CRENEAU OBTAINED BY THE STUDENT */
router.post("/", function(req, res, next) {
  Attributed.create({ idU: req.body.idU, creneau: req.body.creneau }, function(
    err,
    rdv
  ) {
    if (err) {
      return next(err);
    }
    res.json(rdv);
  });
});

/* GETS ALL THE CRENEAUX OBTAINED BY THE STUDENT */

router.get("/:id", function(req, res, next) {
  Attributed.find({ idU: req.params.id }, function(err, creneaux) {
    if (err) {
      return next(err);
    }
    res.json(creneaux);
  });
});

module.exports = router;
