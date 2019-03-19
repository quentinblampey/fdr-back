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
                let aux = user.ue.filter(x => x.name===element.name);
                if (aux.length > 0){
                    ue = ue.concat(aux)
                } else{
                    ue.push({name:element.name, status:"secondary", message:undefined});
                }
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
    console.log(req.body)
    User.findById(req.params.id, function(err, userfound) {
      if (err) {
        return next(err);
      } else {
          let aux=[];
          userfound.ue.forEach(element => {
              if (element.name===req.body.name){
                  aux.push({name:element.name, status:req.body.status, message:element.message});
              }else{
                  aux.push(element);
              }
          });
          userfound.ue = aux;
          userfound.save();
          res.send(userfound);
      }
     })
    });

    router.post("/comment/:id", function(req, res, next) {
        console.log(req.body)
        User.findById(req.params.id, function(err, userfound) {
          if (err) {
            return next(err);
          } else {
              let aux=[];
              userfound.ue.forEach(element => {
                  if (element.name===req.body.name){
                      aux.push({name:element.name, status:element.status, message:req.body.comment});
                  }else{
                      aux.push(element);
                  }
              });
              userfound.ue = aux;
              userfound.save();
              res.send(userfound);
          }
         })
        });

module.exports = router;
