/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prefer-arrow-callback */
const express = require("express");
const router = express.Router();
const Rdv = require("../models/Rdv.js");

/*  GET USER BY ID*/
router.post("/newrdv/:id", function(req, res, next) {
  console.log(req.body.horr);
  const horaire = String(req.body.horr);
  Rdv.create(
    {
      idU: req.params.id,
      horaire: horaire
    },
    function(err, rdv) {
      if (err) return next(err);
      console.log(req.body.horr);
      // console.log("ok");
      res.json(rdv);
    }
  );
});

/* GET ALL D_RDV FOR A USER */
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
