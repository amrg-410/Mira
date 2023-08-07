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
  const {bookingId} = req.body;
  book.find({
    bookingId:bookingId 
  })
  .then((books)=>{
    console.log(books);
      shows.findOne({
        title:books[0].title,
        showDate: books[0].showDate,
        theater: books[0].theater
      })
      .then((result)=>{
        result.seatAvailability += books[0].seats
        result.save()
        res.sendStatus(201)
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