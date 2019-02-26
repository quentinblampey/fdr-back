const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

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
