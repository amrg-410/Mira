const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  movieName: { type: String, required: true },
  review: {type: String, required: true}
});

const review = mongoose.model('reviews', reviewSchema);

module.exports = review;
