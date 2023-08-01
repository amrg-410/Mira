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
        let responseData=[];
          for(var i=0;i<shows.length;i++){
            function getCurrentTimeInAMPM() {
              const date = new Date();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              const amPM = hours >= 12 ? 'PM' : 'AM';
              const formattedHours = (hours % 12) || 12;
              const formattedMinutes = String(minutes).padStart(2, '0');
              const formattedSeconds = String(seconds).padStart(2, '0');
              const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPM}`;
              return currentTime;
            }
            function isTimePassed(givenTime) {
              const currentDate = new Date();
              const givenTimeParts = givenTime.split(':');
              const givenHours = parseInt(givenTimeParts[0]);
              const givenMinutes = parseInt(givenTimeParts[1].split(' ')[0]);
              const isPM = givenTimeParts[1].toLowerCase().includes('pm');
              const hours24Format = (givenHours % 12) + (isPM ? 12 : 0);
              const givenTimeDate = new Date();
              givenTimeDate.setHours(hours24Format, givenMinutes, 0, 0);
              return currentDate > givenTimeDate;
            }
            const currentTime = getCurrentTimeInAMPM(); 
            const givenTime = shows[i].showTimes;
            const isPassed = isTimePassed(givenTime);
            
            if (isPassed) {
               console.log("Show is in past");
            } else {
              responseData+=shows[i];
            }
          }
          if(responseData.length === 0){
            res.status(503).json({message: "No Show Found"});
          }
          else{
            res.json(responseData);
          }
       }
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});


module.exports = route;