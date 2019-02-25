var mongoose = require('mongoose');

var BreakRegistrationSchema = new mongoose.Schema({
  idQ: Number,
});

//module.exports = mongoose.model('BreakRegistration', BreakRegistrationSchema);
module.exports = BreakRegistrationSchema