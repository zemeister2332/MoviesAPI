const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({

    name: {
        type: String,
        maxlength: 30,
        minlength: 4
    },
    surname: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);