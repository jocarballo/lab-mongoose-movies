const express = require('express');
const { render } = require('../app');
const router = express.Router();
const Celebrity = require('../models/celebrity')

router.get('/celebrities', (req, res, next) => {
    // gel all the celebrities
    Celebrity.find()
        .then(celebrities => {
            console.log('Celebrities:', celebrities);
            // render a view
            res.render('celebrities/index', { celebrities: celebrities})
        })
        .catch(err => next(err))
})


router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})


router.get('/celebrities/:id', (req, res, next) => {
    // retrieve the details of a specific celebrity by its id
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrity => {
            console.log(celebrity)
            res.render('celebrities/show', { celebrity: celebrity })
        })
        .catch(err => next(err))
})


router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id
	Celebrity.findById(id)
        .then(celebrity => {
            res.render('celebrities/edit', { 
                id: id,
                celebrity: celebrity }
            )
        })
        .catch(err => next(err))
})


router.post('/celebrities/:id', (req, res, next) => {
    let id = req.params.id
    const { name, occupation, catchPhrase } = req.body
    Celebrity.findByIdAndUpdate({_id: id}, {name , occupation, catchPhrase})
        .then(celebrity => {
            console.log('Edit worked!');
            res.redirect('/celebrities')
        })
        .catch(err => { 
            console.error(err);
            next(err)
        })
})


router.post('/celebrities', (req, res, next) => {
    // get the values from request body
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => {
            res.render('celebrities/new');
        })
})


router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndRemove(id)
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => next(err))
})




module.exports = router;