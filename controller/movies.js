const route = require('express').Router()
const movie = require('../model/movie')
const show = require('../model/shows')


route.get('/saveMovie',()=>{
    const sampleMovieData = [
        {
          title: "Oppenheimer",
          language: "English",
          movieDuration: "3h 10m",
          ageRestrictions: "R",
          moviePoster: "https://github.com/balajisadhasivam/Mira/blob/main/Oppenheimer.jpg",
          additionalInfo: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        },
        {
          title: "Barbie",
          language: "English",
          movieDuration: "1h 54m",
          ageRestrictions: "PG-13",
          moviePoster: "https://github.com/balajisadhasivam/Mira/blob/main/Barbie.jpg",
          additionalInfo: "Barbie suffers a crisis that leads her to question her world and her existence.",
        },
        {
          title: "Blue Beetle",
          language: "English",
          movieDuration: "2h 7m",
          ageRestrictions: "PG-13",
          moviePoster: "https://github.com/balajisadhasivam/Mira/blob/main/Blue%20Beetle.jpg",
          additionalInfo: "An alien relic chooses Jaime Reyes to be its symbiotic host, bestowing the teenager with a suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.",
        },
        {
          title: "Go West",
          language: "English",
          movieDuration: "1h 30m",
          ageRestrictions: "PG-13",
          moviePoster: "https://github.com/balajisadhasivam/Mira/blob/main/Go%20west.jpg",
          additionalInfo: "A crazy group of pioneers brave the harsh elements and numerous mishaps to travel thousands of miles out west to find a place to call home.",
        },
        
      ];
      movie.insertMany(sampleMovieData)
        .then(() => {
          console.log("Sample movie data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving sample movie data:", error);
        });
})


route.get('/saveTimings',()=>{
    const sampleMovieData = [
        {
          title: "Oppenheimer",
          theater: "AMC Empire 25",
          showDate: new Date("2023-07-25"),
          showTimes: "10:00 AM",
          ticketPrice: "$14",
          seatAvailability:  30 
        },
        {
          title: "Barbie",
          theater: "AMC Empire 25",
          showDate: new Date("2023-07-25"),
          showTimes: "02:00 PM",
          ticketPrice: "$14",
          seatAvailability:  30 ,
        },
        {
          title: "Blue Beetle",
          theater: "AMC Empire 25",
          showDate: new Date("2023-07-25"),
          showTimes: "04:30 PM",
          ticketPrice: "$14",
          seatAvailability:  30 ,
        },
        {
          title: "Go West",
          theater: "AMC Empire 25",
          showDate: new Date("2023-07-25"),
          showTimes: "08:00 PM",
          ticketPrice: "$14",
          seatAvailability:  30 ,
        },
        {
          title: "Oppenheimer",
          theater: "Times Square Theater",
          showDate: new Date("2023-07-25"),
          showTimes: "03:30 PM",
          ticketPrice: "$20",
          seatAvailability:  30 
        },
        {
          title: "Barbie",
          theater: "Times Square Theater",
          showDate: new Date("2023-07-25"),
          showTimes: "07:30 PM",
          ticketPrice: "$20",
          seatAvailability:  30 ,
        },
        {
          title: "Blue Beetle",
          theater: "Times Square Theater",
          showDate: new Date("2023-07-25"),
          showTimes: "10:00 AM",
          ticketPrice: "$20",
          seatAvailability:  30 ,
        },
        {
          title: "Go West",
          theater: "Times Square Theater",
          showDate: new Date("2023-07-25"),
          showTimes: "01:30 PM",
          ticketPrice: "$20",
          seatAvailability:  30 ,
        }
      ];
      show.insertMany(sampleMovieData)
        .then(() => {
          console.log("Sample movie data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving sample movie data:", error);
        });
})


route.post('/fetchMovies', (req, res) => {
  console.log("fetchMovies");

  movie.find()
    .then((movies) => {
      res.json(movies);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
});


module.exports=route