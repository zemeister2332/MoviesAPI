const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    directory_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number
});

module.exports = mongoose.model('movie', MovieSchema);