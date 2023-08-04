const route = require('express').Router()
const Booking = require('../model/booking');


const generateBookingId = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BKG-${timestamp}-${randomDigits}`;
};

route.post('/book', (req, res) => {
  const { title, showDate, theater, showTime, seats, user } = req.body;
  console.log(req.body);
  const bookingId = generateBookingId();
  const newBooking = new Booking({
    bookingId,
    title,
    showDate,
    theater,
    showTime,
    seats,
    user,
    paymentId
  });

  newBooking.save()
    .then(() => {
      res.json({ message: 'Booking successful.', bookingId }); 
    })
    .catch((error) => {
      console.error('Error making booking:', error);
      res.status(500).json({ error: 'Booking failed.' });
    });
});


route.post("/fetchBooking",(req,res)=>{
    Booking.find({user:req.body.emailId})
    .then((book)=>{
      if(!book){
        res.sendStatus(404) ;
      }
      else{
        res.send(book);
      }
    })
})


module.exports = route;