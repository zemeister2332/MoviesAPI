const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// models
const Director = require('../model/Director');

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });


});
/*router.get('/', (req, res, next) => {
    const promise = Director.find({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});*/

router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'directory_id',
                as: 'movies'
                }
        },
            {
                $unwind: {
                    path: '$movies'
                }
            },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }

    ]);


    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.put('/:directory_id', (req,res,next) => {
    const promise = Director.findByIdAndUpdate(
        req.params.directory_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((director) => {
        if (!director){
            next({message: 'Director Topilmadi!!!', code: 123});
        }
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});


router.delete('/:directory_id', (req,res,next) => {
    const promise = Director.findByIdAndRemove(
        req.params.directory_id
    );

    promise.then((director) => {
        if (!director){
            next({message: 'Director Topilmadi!!!', code: 123});
        }
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});



router.get('/:directory_id', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.directory_id)
            }
        },

        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'directory_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies'
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }

    ]);


    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
