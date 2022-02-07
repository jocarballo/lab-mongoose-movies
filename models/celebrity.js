const mongoose = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const Schema = mongoose.Schema;
const celebritySchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    occupation: {
      type: String
    },
    catchPhrase: {
      type: String
    }
  });

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
