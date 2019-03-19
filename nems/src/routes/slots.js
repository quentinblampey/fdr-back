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
      idU: "NONE",
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

router.get("/:id", function(req, res, next) {
  Slot.findById(req.params.id, function(err, slot) {
    if (err) {
      return next(err);
    }
    res.json(slot);
    return 0;
  });
});

/* GETS ALL THE FREE SLOTS OF THE WEEK TO PROPOSE THEM TO THE STUDENT */

router.get("/getfree/", function(req, res, next) {
  Slot.find({ affectation: "", idU: { $ne: "NONE" } }, function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
    return 0;
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

/* GET USER BY ID */
router.post("/newrdv/:id", function(req, res, next) {
  const nhoraire = String(req.body.horr);
  const nidU = req.params.id;
  Slot.create({ idU: nidU, date: nhoraire, duration: 15 }, function(err, rdv) {
    if (err) {
      return next(err);
    }
    res.json(rdv);
  });
});

/* GET ALL RDV FOR A USER */
router.get("/rdvu/:id", function(req, res, next) {
  Slot.find({ idU: req.params.id }, function(err, rdvs) {
    if (err) {
      return next(err);
    }
    res.json(rdvs);
  });
});

module.exports = router;
