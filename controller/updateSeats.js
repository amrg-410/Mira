const shows = require('../model/shows')
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
})


module.exports = route