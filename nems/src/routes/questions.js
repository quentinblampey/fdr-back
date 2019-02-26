var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question');
var User = require('../models/User.js');
var construct = require('../models/Question.construct');

/* GET ALL Questions */

router.get('/', function(req, res, next) {
  Question.find(function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});


/* GET SINGLE Question BY ID OF PREVIOUS ANSWER */

/*
router.get('/:idQ', function(req, res, next) {
  Question.findOne({idQ: req.params.idQ}, function (err, post) {
    if (err) return next(err);
    if (post.personalized) {
      // post.construct(req.body.details) 
      post = construct(post,req.body.details)
    }
    res.json(post);
  });
});
*/

/*
router.post('/:idQ', function(req, res, next) {
  Question.findOne({idQ: req.params.idQ}, function (err, post) {
    if (err) return next(err);
    if (post.personalized) {
      // post.construct(req.body.details) 
      post = construct(post,req.body.details)
    }
    res.json(post);
  });
});
*/
 
/* Find Question */
router.post('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {return next(err)};
    user.numberChats.push(Date.now().toString())
    user.markModified('numberChats'); 
    if (user.currentBreak.length==0) {
      user.currentBreak = user.nextBreak;
      user.nextBreak = [];
      user.save();
      res.json({ question : {}, isFinish : true, user : user })
    }
    else {
      idQ = user.currentBreak.pop();
      user.save();
      Question.findOne({idQ: idQ}, function (err, post) {
        if (err) return next(err);
        if (post.personalized) {
          post = construct(post,user.details)
        } 
        res.json({ question : post, isFinish : false, user : user});
      });
    }
  });
});

/* UPDATE Question */
router.put('/:id', function(req, res, next) {
  Question.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Question */
router.delete('/:id', function(req, res, next) {
  Question.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;