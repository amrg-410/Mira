const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String },
  movieDuration: { type: String },
  ageRestrictions: { type: String },
  moviePoster: { type: String },
  additionalInfo: { type: String },
});

const movie = mongoose.model('movies', movieSchema);

module.exports=movie