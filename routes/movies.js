const express = require('express');
const { render } = require('../app');
const Celebrity = require('../models/Celebrity');
const router = express.Router();
const Movie = require('../models/Movie')


router.get('/movies', (req, res, next) => {
    // gel all the celebrities
    Movie.find()
        .then(movies => {
            console.log('Movies:', movies);
            // render a view
            res.render('movies/index', { movies: movies})
        })
        .catch(err => next(err))
})


router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("movies/new", { celebrities: celebrities })
        })
        .catch(err => next(err));
    
});


router.post('/movies', (req, res, next) => {
    // get the values from request body
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => {
            res.render('movies/new');
        })
})


module.exports = router;