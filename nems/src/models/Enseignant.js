var mongoose = require('mongoose');
var crypto = require('crypto')

var EnseignantSchema = new mongoose.Schema({
  name: {type: String, default: "enseignant"},
  hash: String,
  salt: String,
});

EnseignantSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

EnseignantSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

EnseignantSchema.methods.sendHash = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash;
};

module.exports = mongoose.model('Enseignant', EnseignantSchema);