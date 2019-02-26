const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.post('/initget', function(req, res, next) {
  console.log(req.body.pseudo);
  User.findOne({pseudo : req.body.pseudo}, function (err, post) {
    if (err) { return next(err) };
    if (post === null) {
      console.log("creating...")
      firstTrees = [ 4, 1 ];
      User.create({pseudo: req.body.pseudo, registration: Date.now().toString(), numberQuestions: 0, numberChats: [],  currentBreak : firstTrees, nextBreak : [], details: {name: "", sport: ""}}, function (err, post) {
        if (err) return next(err);
        console.log("Created !")
        res.json(post);
      }); 
    } else {
    res.json(post);}
  }); 
});

/*  GET USER BY ID*/
router.get('/getid/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, users) {
    if (err) {return next(err)};
    res.json(users);
  });
});

/* GET ALL UserS */

router.get('/', function(req, res, next) {
  console.log('Will it work ??');
  User.find(function (err, users) {
    if (err) {return next(err)};
    res.json(users);
  });
});


/* UPDATE User */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    field = req.body.field;
    post.details[field] = req.body.answer.detail;
    post.save();
    res.json(post);
  });
});


/* UPDATE User AFTER END OF CHAT */
router.put('/endchat/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* DELETE User NOT NECESSARY
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

module.exports = router;