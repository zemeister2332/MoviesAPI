const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    directory_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH} qismi majburiy!!!`'],
        unique: true,
        maxlength: 15,
        min: 3

    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 2
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 2
    },
    year:{
        type: Number,
        max: 2020,
        min: 1900
    },
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);