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
const Rdv = require("../models/Rdv.js");

/* GET USER BY ID */
router.post("/newrdv/:id", function(req, res, next) {
  console.log(req.body.horr);
  const nhoraire = String(req.body.horr);
  const nidU = req.params.id;
  Rdv.create({ idU: nidU, horaire: nhoraire }, function(err, rdv) {
    if (err) {
      return next(err);
    }
    res.json(rdv);
  });
});

/* GET ALL RDV FOR A USER */
router.get("/:id", function(req, res, next) {
  Rdv.find({ idU: req.params.id }, function(err, rdvs) {
    if (err) {
      return next(err);
    }
    let horaires = [];
    rdvs.map(rdv => horaires.push(rdv.horaire));
    res.json(horaires);
  });
});

module.exports = router;
