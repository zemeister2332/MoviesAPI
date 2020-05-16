const mongoose = require('mongoose');

module.exports = () => {

    mongoose.connect('mongodb+srv://movie_user:qwerty123@movie-api-aytcl.mongodb.net/test',
        { useNewUrlParser: true , useUnifiedTopology: true}
        );

    mongoose.connection.on('open', () => {
        console.log("Mongo DB Bog'landi!!!")
    });
    mongoose.connection.on('error', (err) => {
        console.log("XATO: Mongo DB Bog'lanmadi!!!", err)
    });
}
