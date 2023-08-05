const route = require('express').Router()
const show = require('../model/shows')
const isTimePassed = require('./isTimePassed')
const getCurrentDate = require('./getCurrentDate');
const isDatePassed = require('./isDatePassed');


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
        let responseData=[];
        const currentDate = getCurrentDate();
        console.log(currentDate);
          for(var i=0;i<shows.length;i++){
            var temp = shows[i].showDate.toString();
            if(shows[i].showDate === currentDate){
              const givenTime = shows[i].showTimes;
              const isPassed = isTimePassed(givenTime);
              if (isPassed) {
                console.log("Show is in past");
                continue;
              } 
            }
            else if(isDatePassed(temp.split("T")[0])){
                continue;
            }
            responseData.push(shows[i]);
          }
          if(responseData.length === 0){
            res.status(503).json({message: "No Show Found"});
          }
          else{
            res.send(responseData);
          }
       }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});


module.exports = route;