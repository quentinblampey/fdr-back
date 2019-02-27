const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

var fs = require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
 
router.post('/newfile', upload.single('file'), function (req, res, next) {
    var obj = JSON.parse(fs.readFileSync(req.file.path, 'utf8'));
    Question.deleteMany({}, async (err, del) => {
        Question.insertMany(obj, async (err, ins) => {
            Question.find((err, found) => {
                res.send(obj);
            });
        });
    });
})

router.post('/', (req, res) => {
    const json = require('../../uploads/questionsPrenomSport.json');
    Question.deleteMany({}, async (err, del) => {
        Question.insertMany(json, async (err, ins) => {
            Question.find((err, found) => {
                res.send('done');
            });
        });
    });
});

module.exports = router;
