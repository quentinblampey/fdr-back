const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

const range = 10;
const val1 = 3;
const val2 = 7;
const topercent = 100;

// This fontion computes the global statics in order to draw the repartition charts

router.post("/global", (req, res, next) => {
  let nb = [0, 0, 0];
  let taille = 0;
  User.find({}, (err, users) => {
    users.forEach(student => {
      //let score = student.score[req.body.field];
      let score = range * Math.random();
      console.log(score);
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
    console.log(taille);
    nb.forEach((n, i) => {
      final[i] = n / taille;
    });
    res.send(final);
  });
});

module.exports = router;
