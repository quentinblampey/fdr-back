var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    var json = require('../../src/questionsPrenomSport.json');
    console.log(json);
    Question.insertMany(json, function(err,result) {
        console.log(json);
        if (err) {
          return err;
        } else {
          return result;
        }
     });
    return res;
  });

module.exports = router;