const mongoose = require('mongoose')

// connect to mongoose
mongoose.connect('mongodb://localhost/movies-lab')
	.then(db => console.log(`connected to database ${db.connections[0].name}`))
	.catch(err => console.log(err))

const Celebrity = require('../models/Celebrity')
const Movie = require('./models/Movie')

const celebrities = [
    {
		name: "Groot",
		occupation: "Character",
        catchPhrase: "I am Groot"
	},
	{
		name: "Buzz Lightyear",
		occupation: "Character",
        catchPhrase: "To infinity, and beyond!"
	},
	{
		name: "Michael Scott",
		occupation: "Actor",
        catchPhrase: "That's what she said!"
	}
]




// Call the Celebrity model's create method with the array as argument.
Celebrity.insertMany(celebrities)
    .then(celebrities => {
        console.log('Here we got celebrities: ' + celebrities)
        mongoose.connection.close();
    })
    .catch(err => console.log(err))
