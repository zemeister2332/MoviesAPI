const express = require('express');
const router = express.Router();

const Movie = require('../model/Movie');




router.get('/', (req, res, next) => {
   const promise = Movie.find({ });
   promise.then((data) => {
      res.json(data);
   }).catch((err) => {
      res.json(err);
   });

});

router.post('/', (req, res, next) => {
  //const { title, category, imdb_score, year, country } = req.body;
  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   year: year,
  //   country: country
  // });
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
      res.json(err);
  });

});

router.get('/:movie_id', (req,res) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
