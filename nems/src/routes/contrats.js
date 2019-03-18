var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User.js");

router.post("/:id", function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
    console.log(user.ue);
    if (err) {
      return next(err);
    } else {
        let ue = [];
        req.body.UEs.forEach(element => {
            if (element.checked){
                ue.push({name:element.name, status:"secondary", message:undefined});
            }
        });
        user.ue = ue;
        user.save();
        console.log(user.ue);
        res.send(user);
    }
   })
  });

  router.post("/options/:id", function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      } else {
          console.log("1", user.ue)
          let ue = user.ue;
          ue.forEach(element => {
              if (element.name===req.body.name){
                  element.status = req.body.status;
              }
          });
          console.log("2", user.ue);
          user.ue = ue;
          user.save();
          console.log("3", user.ue);
          res.send(user);
      }
     })
    });

module.exports = router;
