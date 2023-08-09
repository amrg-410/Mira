const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  showDate: { type: Date, required: true },
  theater: {type: String, required:true},
  showTime: { type: String, required: true },
  seats: { type: Number, required: true },
  user: { type: String, required: true },
  paymentId:{ type: String, required:true},
  moviePoster:{type: String, required: true},
  amount:{type: Number, required: true},
  seatNumber:{type: String, required: true}
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;
