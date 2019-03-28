var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User.js");

router.post("/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    } else {
      let ue = [];
      req.body.UEs.forEach(element => {
        if (element.checked) {
          let aux = user.ue.filter(x => x.name === element.name);
          if (aux.length > 0) {
            ue = ue.concat(aux);
          } else {
            ue.push({
              name: element.name,
              status: "secondary",
              message: undefined,
              missing: [],
              dateValid: ""
            });
          }
        }
      });
      user.ue = ue;
      user.save();
      res.send(user);
    }
  });
});

router.post("/options/:id", function(req, res, next) {
  User.findById(req.params.id, function(err, userfound) {
    if (err) {
      return next(err);
    } else {
      let aux = [];
      let dateValidation = "Validé en ";
      if (String(req.body.status) === "success") {
        let date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth();
        if (month < 8) {
          dateValidation += String(year - 1) + "/" + String(year);
        } else {
          dateValidation += String(year) + "/" + String(year + 1);
        }
      }
      userfound.ue.forEach(element => {
        if (element.name === req.body.name) {
          aux.push({
            name: element.name,
            status: req.body.status,
            message: element.message,
            dateValid: dateValidation
          });
        } else {
          aux.push(element);
        }
      });
      userfound.ue = aux;
      userfound.save();
      res.send(userfound);
    }
  });
});

router.post("/modal/:id", function(req, res, next) {
  console.log(req.body);
  User.findById(req.params.id, function(err, userfound) {
    if (err) {
      return next(err);
    } else {
      let aux = [];
      console.log(userfound.ue);
      userfound.ue.forEach(element => {
        if (element.name === req.body.name) {
          if (req.body.field === "missing") {
            aux.push({
              name: element.name,
              status: element.status,
              message: element.message,
              missing: element.missing.concat(req.body.comment)
            });
          } else {
            aux.push({
              name: element.name,
              status: element.status,
              message: req.body.comment,
              missing: element.missing
            });
          }
        } else {
          aux.push(element);
        }
      });
      userfound.ue = aux;
      userfound.save();
      console.log(userfound.ue);
      res.send(userfound);
    }
  });
});

module.exports = router;
