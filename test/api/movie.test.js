const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
     before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'zeus', password: '12345'})
            .end((err,res) => {
                token = res.body.token;
                done();
            })
     });

    describe('/GET movies', () => {
        it('should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movie', () => {
        it('should POST a movie', (done) => {
            const movie = {
                title: 'For Test',
                directory_id: '5ec3e85c140bbd2d56cfeb0c',
                category: 'Comedy',
                country: 'Thailand',
                year: 1950,
                imdb_score: 9.9
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directory_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/movie_id movie', () => {
        it('should GET a movie by given _id', (done) => {

            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directory_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('/PUT/movie_id movie', () => {
        it('should PUT a movie', (done) => {
            const movie = {
                title: 'TESTTT',
                directory_id: '5ec3e85c140bbd2d56cfeb0b',
                category: 'War',
                country: 'USA',
                year: 1999,
                imdb_score: 8.3
            };
            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('directory_id').eql(movie.directory_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);

                    done();
                });
        });
    });

    describe('/DELETE/movie_id movie', () => {
        it('should DELETE movie by id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});



