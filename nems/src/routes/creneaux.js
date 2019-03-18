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
const Creneau = require("../models/Creneau.js");

/* CREATES NEW CRENEAU FOR THIS WEEK */
router.post("/", function(req, res, next) {
  let liste = [];
  let creneau = {
    open: true,
    decided: false,
    duration: req.body.duration,
    numberTot: req.body.numberTot,
    plage: req.body.plage,
    liste: liste,
    asked: []
  };
  Creneau.create(creneau, function(err, rdv) {
    if (err) {
      return next(err);
    }
    res.json(creneau);
  });
});

/* GETS ALL THE CRENEAUX OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/", function(req, res, next) {
  Creneau.find({ open: true }, function(err, creneau) {
    if (err) {
      return next(err);
    }
    res.json({ liste: creneau.list, number: creneau.numberTot });
  });
});

/* GET ALL RDV FOR A USER */
router.get("/:id", function(req, res, next) {
  Creneau.find({ idU: req.params.id }, function(err, rdvs) {
    if (err) {
      return next(err);
    }
    let horaires = [];
    rdvs.map(rdv => horaires.push(rdv.horaire));
    res.json(horaires);
  });
});

module.exports = router;
