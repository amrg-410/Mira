const route = require('express').Router()
const show = require('../model/shows')


route.post("/showTimings", (req, res) => {
  console.log(req.body);
  const { title, showDate } = req.body;
  console.log(title,showDate);
  show.find({
    title: title,
    showDate: showDate
  })
  .then((shows) => {
       if(shows.length === 0){
          res.sendStatus(404);
       }
       else{
          res.send(shows);
       }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});


module.exports = route;