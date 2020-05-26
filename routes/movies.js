const express = require('express');

const router = express.Router();

// Models
const Movie = require('../model/Movie');


router.get('/', (req, res, next) => {
   const promise = Movie.aggregate([
       {
           $lookup:{
               from: 'directors',
               localField: 'directory_id',
               foreignField: '_id',
               as: 'director'
           }
       },
       {
         $unwind: '$director'
       }
   ]);
   promise.then((data) => {
      res.json(data);
   }).catch((err) => {
      res.json(err);
   });

});

router.get('/top10', (req,res,next) => {
    const promise = Movie.find({ }).limit(10).sort({imdb_score: 1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/between/:start_year/:end_year', (req,res,next) => {
    const { start_year, end_year } = req.params;
    const promise = Movie.find(
    {
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year)}
    })

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

})


router.get('/:movie_id', (req,res,next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
        if (!movie){
            next({message: 'Movie Topilmadi!!!', code: 123});
        }
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:movie_id', (req,res,next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((movie) => {
        if (!movie){
            next({message: 'Movie Topilmadi!!!', code: 123});
        }
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:movie_id', (req,res,next) => {
    const promise = Movie.findByIdAndRemove(
        req.params.movie_id
    );

    promise.then((movie) => {
        if (!movie){
            next({message: 'Movie Topilmadi!!!', code: 123});
        }
        res.json( {status: 1} );
    }).catch((err) => {
        res.json(err);
    });
});



router.post('/', (req, res, next) => {
  // const { title, category, imdb_score, year, country } = req.body;
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




module.exports = router;
