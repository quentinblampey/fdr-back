const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
var fs = require("fs");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, "current");
  }
});
var upload = multer({ storage: storage });

/*
  Role    | Uploads a file containing the question tree.
  Params  | None
  Body    | File of the questions.
  Returns | The inserted questions.
*/

router.post(
  "/TbAa3CpZXgS1apnKjCnj3VdnkIxMhlny/newfile",
  upload.single("file"),
  function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync("./uploads/current", "utf8"));
    Question.deleteMany({}, (err, del) => {
      // Supress the previous questions.
      Question.insertMany(obj, (err, ins) => {
        if (err) {
          res.send(err);
        } else {
          res.send(ins);
        }
      });
    });
  }
);

module.exports = router;
