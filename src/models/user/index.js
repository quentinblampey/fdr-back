const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
});

class User {
    static findByEmail (email) {
        return this.findOne({email});
    }
}

schema.loadClass(User);

module.exports = mongoose.model('User', schema);
