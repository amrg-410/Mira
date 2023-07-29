const route = require('express').Router()
const show = require('../model/shows')
const moment = require('moment'); 


route.post('/showTimings', (req, res) => {
  console.log(req.body);
  const { title, showDate } = req.body;
  console.log(title,showDate);
  
  const currentDate = new Date();
  if (req.body.showDate === currentDate.toISOString().split('T')[0]) {
    show.find({
      title: title,
      showDate: showDate
    })
    .then((shows) => {
        console.log(shows);
        const currentTime = moment();
        const filteredShows = shows.filter((show) => {
          const givenDateTime = moment(show.showTimes, 'hh:mm A', true);
          console.log(givenDateTime);
          return givenDateTime.isAfter(currentTime);
        });
        if(filteredShows.length == 0){
            res.sendStatus(404);
        }
        else{
          console.log("filteredShows", filteredShows);
          res.json(filteredShows);
        }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
  }
  else{
    let errorObj={};
    errorObj['error']="Invalid date";
    res.statusCode(503);
  }
});


module.exports = route;