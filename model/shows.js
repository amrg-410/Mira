const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  theater: { type: String, required: true },
  showDate: { type: Date, required: true },
  showTimes: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  seatAvailability: { type: Number, required: true },
});

const shows = mongoose.model('shows', movieSchema);

module.exports=shows