const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot.js");
const User = require("../models/User.js");

/*
  Role    | Create a slot.
  Params  | None
  Body    | date : date of the slot, duration : duration of the slot
  Returns | The slot created.
*/

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

/*
  Role    | Get all the slots.
  Params  | None
  Body    | None
  Returns | The slots.
*/

router.get("/", function(req, res, next) {
  Slot.find(function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
  });
});

/*
  Role    | Get all the free slots (not assigned).
  Params  | None
  Body    | None
  Returns | The free slots.
*/

router.get("/getfree", function(req, res, next) {
  Slot.find({ affectation: "", idU: "NONE" }, function(err, slots) {
    if (err) {
      return next(err);
    }
    res.json(slots);
  });
});

/*
  Role    | Get a slot by its id.
  Params  | id : slot id
  Body    | None
  Returns | The slot.
*/

router.get("/:id", function(req, res, next) {
  Slot.findById(req.params.id, function(err, slot) {
    if (err) {
      return next(err);
    }
    res.json(slot);
  });
});

/*
  Role    | Clear all slots.
  Params  | None
  Body    | None
  Returns | The suppression.
*/

router.get("/TbAa3CpZXgS1apnKjCnj3VdnkIxMhlny/clear", function(req, res, next) {
  Slot.deleteMany({}, (err, slots) => {
    res.send(slots);
  });
});

/*
  Role    | Delete a slot by its id.
  Params  | id : slot id.
  Body    | None
  Returns | The suppressed slot.
*/

router.delete("/clear/:id", function(req, res, next) {
  Slot.deleteOne({ _id: req.params.id }, (err, slot) => {
    if (err) {
      return next(err);
    }
    res.send(slot);
  });
});

/*
  Role    | Delete a slot for a given user.
  Params  | id : user id.
  Body    | horr : start of the slot
  Returns | The slot.
*/

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

/*
  Role    | Get all the slot for a given user.
  Params  | id : user id.
  Body    | None
  Returns | The slots.
*/

router.get("/rdvu/:id", function(req, res, next) {
  Slot.find({ idU: req.params.id }, function(err, rdvs) {
    if (err) {
      return next(err);
    }
    res.json(rdvs);
  });
});

/*
  Role    | Accept the slot asked by a single user.
  Params  | id : user id.
  Body    | idRDV : slot id.
  Returns | The slot.
*/

router.put("/rdvOK/:id", function(req, res, next) {
  Slot.findOne({ idU: req.params.id, _id: req.body.idRDV }, function(err, rdv) {
    if (err) {
      return next(err);
    }
    console.log(rdv);
    rdv.affectation = req.body.idRDV;
    console.log(rdv);
    rdv.save().then(() => {
      Slot.deleteMany({ idU: req.params.id, affectation: "" }, function(
        err,
        oldRdv
      ) {
        if (err) {
          return next(err);
        }
      });
    });
    User.findById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      }
      user.currentSlot = rdv._id;
      user.save();
    });
    res.json(rdv);
  });
});

module.exports = router;
