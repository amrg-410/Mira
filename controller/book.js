const route = require('express').Router()
const Booking = require('../model/booking');
const isDatePassed = require('./isDatePassed')
const isTimePassed = require('./isTimePassed')
const getCurrentDate = require('./getCurrentDate')
const show = require('../model/shows')



const generateBookingId = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BKG-${timestamp}-${randomDigits}`;
};

route.post('/book', (req, res) => {
  const { title, showDate, theater, showTime, seats, user, paymentId } = req.body;
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
      if(book.length === 0){
        res.sendStatus(404) ;
      }
      else{
        console.log(book)
        let responseData=[];
        const currentDate = getCurrentDate();
        console.log(currentDate);
          for(var i=0;i<book.length;i++){
            var temp = book[i].showDate.toString();
            console.log(temp);
            if(book[i].showDate === currentDate){
              const givenTime = book[i].showTimes;
              const isPassed = isTimePassed(givenTime);
              if (isPassed) {
                console.log("Show is in past");
                continue;
              } 
            }
            else if(isDatePassed(temp.split('T')[0])){
              continue;
            }
            responseData.push(book[i]);
          }
          if(responseData.length === 0){
            res.status(503).json({message: "No Bookings Found"});
          }
          else{
            res.send(responseData);
          }
      }
    })
})


route.post('/cancel',(req,res)=>{
  Booking.deleteOne({
    bookingId:req.body.bookingId
  })
  .then((result) => {
    show.findOne({
      title: result.title,
      showDate: result.showDate,
      showTimes: result.showTime
    })
    .then((rlt)=>{
        rlt.seatAvailability+=result.seats
    })
    res.sendStatus(200); 
  })
  .catch((error) => {
    console.error('Error cancel booking:', error);
    res.status(500).json({ error: 'Cancelling failed.' });
  });
})


module.exports = route;