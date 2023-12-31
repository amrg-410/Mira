const shows = require('../model/shows')
const book = require('../model/booking')
const route = require('express').Router()


route.post("/updateSeats",(req,res)=>{
  const {title,showDate,theater,seatAvailability} = req.body;
  console.log(req.body);
  shows.findOne(
    {
      title: title,
      showDate: showDate,
      theater : theater   
    }
  )
  .then((seats)=>{
      seats.seatAvailability -= seatAvailability;
      seats.save();
      res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
})


route.post('/addSeats', (req, res) => {
  const  bookingId = req.body.bookingId;
  console.log(req.body)
  console.log(bookingId)
  book.findOne({
    bookingId: bookingId
  })
  .then((bookData) => {
    if (!bookData) {
      console.log("book=0");
      return res.sendStatus(404); 
    }
    shows.findOne({
      title: bookData.title,
      showDate: bookData.showDate,
      theater: bookData.theater
    })
    .then((result) => {
      if (!result) {
        console.log("result=0");
        return res.sendStatus(404); 
      }
      console.log("Seat Updating");
      result.seatAvailability += bookData.seats;
      result.save()
        .then(() => {
          res.send(bookData); 
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500); 
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500); 
    });
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500); 
  });
});




module.exports = route