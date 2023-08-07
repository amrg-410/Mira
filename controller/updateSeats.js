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


route.post('/addSeats',(req,res)=>{
  book.findOne({
    bookingId:req.body.bookingId
  })
  .then((books)=>{
      shows.findOne({
        title:books.title,
        showDate: books.showDate,
        theater: books.theater
      })
      .then((result)=>{
        result.seatAvailability += books.seats
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
})


module.exports = route