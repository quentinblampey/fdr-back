const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

const val1 = 3;
const val2 = 7;
const topercent = 100;

// This fontion computes the global statics in order to draw the repartition charts

router.post("/global", (req, res, next) => {
  let nb = [0, 0, 0];
  let taille = 0;
  User.find({}, (err, users) => {
    users.forEach(student => {
      let score = student.score[req.body.field];
      if (score >= 0) {
        taille += 1;
        if (score < val1) {
          nb[0] += topercent;
        } else if (score < val2) {
          nb[1] += topercent;
        } else {
          nb[2] += topercent;
        }
      }
    });
    let final = [0, 0, 0];
    nb.forEach((n, i) => {
      final[i] = n / taille;
    });
    res.send(final);
  });
});

router.post("/profils", (req, res, next) => {
  let proportions = [];
  let taille = 0;
  User.find({}, async (err, users) => {
    req.body.profils.forEach(profil => {
      let nb = 0;
      let taille = 0;
      users.forEach(student => {
        if (student.caracteristics[profil]) {
          nb += 1;
        }
        taille += 1;
      });
      proportions.push(
        parseFloat(Math.round((1000 * nb) / taille) / 10).toFixed(0)
      );
    });
    res.send({ proportions: proportions });
  });
});

module.exports = router;
