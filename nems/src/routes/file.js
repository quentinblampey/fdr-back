const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

var fs = require("fs");

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

// THIS ROUTE IS USED TO UPLOAD A FILE CONTAINING THE NEW QUESTIONS TREE

router.post("/newfile", upload.single("file"), function(req, res, next) {
  var obj = JSON.parse(fs.readFileSync(req.file.path, "utf8"));
  Question.deleteMany({}, async (err, del) => {
    Question.insertMany(obj, async (err, ins) => {
      Question.find((err, found) => {
        res.send(obj);
      });
    });
  });
});

module.exports = router;
