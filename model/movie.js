const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_title: { type: String, required: true },
  theater_name: { type: String, required: true },
  show_date: { type: Date, required: true },
  show_times: [{ type: String, required: true }],
  ticket_price: { type: Number, required: true },
  seat_availability: [{
    show_time: { type: String, required: true },
    available_seats: { type: Number, required: true }
  }],
  movie_hall: { type: String },
  language: { type: String },
  movie_duration: { type: String },
  age_restrictions: { type: String },
  movie_poster: { type: String },
  additional_info: { type: String },
});

const movie = mongoose.model('Movie', movieSchema);

module.exports=movie