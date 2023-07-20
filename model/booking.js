const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  showDate: { type: Date, required: true },
  showTime: { type: String, required: true },
  seats: { type: String, required: true },
  user: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
