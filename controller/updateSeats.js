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
  const { bookingId } = req.body;
  book.find({
    bookingId: bookingId 
  })
  .then((books) => {
    if (books.length === 0) {
      return res.sendStatus(404); 
    }

    const bookData = books[0];

    shows.findOne({
      title: bookData.title,
      showDate: bookData.showDate,
      theater: bookData.theater
    })
    .then((result) => {
      if (!result) {
        return res.sendStatus(404); 
      }

      result.seatAvailability += bookData.seats;
      result.save()
        .then(() => {
          res.sendStatus(201); 
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