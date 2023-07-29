const route = require('express').Router()
const show = require('../model/shows')
const moment = require('moment'); 


route.post('/showTimings', (req, res) => {
  console.log(req.body);
  const { title, showDate } = req.body;
  console.log(title,showDate);
  show.find({
    title: title,
    showDate: showDate
  })
  .then((shows) => {
    const currentDate = new Date();
    if (req.body.showDate === currentDate.toISOString().split('T')[0]) {
      console.log(shows);
      const currentTime = moment();
      const filteredShows = shows.filter((show) => {
          for(var i=0;i<shows.length;i++){
            const givenDateTime = moment(show[i].showTimes, 'hh:mm A', true);
            return givenDateTime.isAfter(currentTime);
          }
      });
      if(filteredShows.length == 0){
          res.sendStatus(404);
      }
      else{
        console.log("filteredShows", filteredShows);
        res.json(filteredShows);
      }
    } else {
      res.json(shows);
    }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});


module.exports = route;