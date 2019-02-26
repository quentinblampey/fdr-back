var express = require('express');
var router = express.Router();
var Ens = require('../models/Enseignant');
var crypto = require('crypto')





/* GET THE HASH AND THE SALT OF THE ENSEIGNANT PROFILE */
router.get('/', function(req, res, next) {
  Ens.findOne(function (err, post) {
    if (err) { return next(err) };
        res.json(post);
    return 0
  });
});

/*  CREATES THE PROFILE */
router.post('/create/:mdp', function(req, res, next) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(req.params.mdp, salt, 1000, 64, 'sha512').toString('hex');
  console.log(hash)
  console.log(salt)
  Ens.create({hash: hash, salt: salt}, function (err, ens) {
    if (err) {return next(err)};
    res.json(ens)
});
})









module.exports = router;