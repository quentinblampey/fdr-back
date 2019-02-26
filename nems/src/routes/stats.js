const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

const range = 10;
const val1 = 3;
const val2 = 7;
const topercent = 100;

router.post('/global', (req, res, next) => {
    let nb = [0, 0, 0];
    let taille=0;
        User.find({}, (err, users) => {
            users.forEach(student => {
                //let score = student.score[req.body.field];
                let score = range*Math.random();
                console.log(score);
                if (score >= 0) {
                    taille += 1;
                    if (score < val1) {
                        nb[0] += topercent;
                    } else if (score < val2) {
                        nb[1] += topercent;
                    } else {
                        nb[2] += topercent;
                    }
                }
            });
            let final=[0, 0, 0];
            console.log(taille);
            nb.forEach((n, i) => {final[i] = n / taille});
            res.send(final);
        });
});

function updateFidelity (user) {
    if (user.numberChats === undefined || user.numberChats===null || user.numberChats.length === 0) {
        return 0;
    } else {
        var score = 0;
        var d = new Date()
        var today = [d.getFullYear(), d.getMonth()+1, d.getDate()]
        
        var lastChat = user.numberChats[user.numberChats.length-1]
        var lastEval = [lastChat.split("T")[0].split("-")[0], lastChat.split("T")[0].split("-")[1], lastChat.split("T")[0].split("-")[2]]


        var dateRegistration = [user.registration.split("T")[0].split("-")[0], user.registration.split("T")[0].split("-")[1], user.registration.split("T")[0].split("-")[2]]
            
        if (today[1] - lastEval[1] >= 1 || today[0] - lastEval[0] >= 1) {
            score+=1
          } else if (today[2] - lastEval[2] > 21) {
            score+=2
          } else if (today[2] - lastEval[2] > 14) {
            score+=3
          } else if (today[2] - lastEval[2] > 7) {
            score+=4
          } else if (today[2] - lastEval[2] < 7) {
            score+=5
        }
        
        var nbchats = user.numberChats.length
        var nbMois = (today[0] - dateRegistration[0])*12 + today[1] - dateRegistration[1]

        if (nbMois === 0 && nbchats===1) {
            score +=2
        } else if (nbMois === 0 && nbchats===2) {
            score +=4
        } else if (nbchats > 2* nbMois ) {
            score +=5
        } else if (nbchats > nbMois) {
            score +=3
        } else if (nbchats < nbMois) {
            score +=1
        }

        return score
    }
}

function computeScore (student, field) {
    return Math.random() * range;
}

function computeRepartition (studentList, field) {
    let nb = [0, 0, 0];
    let taille = studentList.length;
    console.log('studentList', studentList);
    let student;
    for (student in studentList) {
        console.log(student.score);
        let score = student.score[field];
        console.log(score);
        if (score < val1) {
            nb[0] += topercent / taille;
        } else if (score < val2) {
            nb[1] += topercent / taille;
        } else {
            nb[2] += topercent / taille;
        }
    }
    return nb;
}

module.exports = router;