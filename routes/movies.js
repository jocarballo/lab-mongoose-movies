const express = require('express');
const { render } = require('../app');
const Celebrity = require('../models/Celebrity');
const router = express.Router();
const Movie = require('../models/Movie')


router.get('/movies', (req, res, next) => {
    // gel all the celebrities
    Movie.find().populate('cast')
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


router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
	Movie.findById(id)
        .then(movie => {
            res.render('movies/edit', { 
                id: id,
                movie: movie }
            )
        })
        .catch(err => next(err))
})

router.post('/movies/:id', (req, res, next) => {
    let id = req.params.id
    const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate({_id: id}, { title, genre, plot, cast })
        .then(movie => {
            console.log('Edit worked!');
            res.redirect('/movies')
        })
        .catch(err => { 
            console.error(err);
            next(err)
        })
})

module.exports = router;