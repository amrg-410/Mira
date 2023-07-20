const route = require('express').Router()
const Booking = require('../model/booking');


const generateBookingId = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BKG-${timestamp}-${randomDigits}`;
};

route.post('/book', (req, res) => {
  const { title, showDate, showTime, seats, user } = req.body;
  const bookingId = generateBookingId();

  const newBooking = new Booking({
    bookingId,
    title,
    showDate,
    showTime,
    seats,
    user
  });

  newBooking.save()
    .then(() => {
      return updateSeats(title, showDate, showTime);
    })
    .then(() => {
      res.json({ message: 'Booking successful.', bookingId }); 
    })
    .catch((error) => {
      console.error('Error making booking:', error);
      res.status(500).json({ error: 'Booking failed.' });
    });
});

module.exports = route;
