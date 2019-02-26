const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const fs = require('fs');

const multer = require('multer');

const upload = multer({ dest: __dirname + '../uploads' });

router.post('/', upload.single('file'), (req, res, next) => {
    const json = require('../../uploads/questionsPrenomSport.json');
    Question.deleteMany({}, async (err, del) => {
        Question.insertMany(json, async (err, ins) => {
            Question.find((err, found) => {
                console.log('del', del);
                console.log('found', found);
                res.send('done');
            });
        });
    });
});

module.exports = router;
