const route = require('express').Router()
const movie = require('../model/movie')
const show = require('../model/shows')


route.get('/saveMovie',()=>{
    const sampleMovieData = [
        {
          title: "Movie 1",
          language: "English",
          movieDuration: "2h 15m",
          ageRestrictions: "PG-13",
          moviePoster: "poster1.jpg",
          additionalInfo: "Some additional information about Movie 1",
        },
        {
          title: "Movie 1",
          language: "English",
          movieDuration: "2h 15m",
          ageRestrictions: "PG-13",
          moviePoster: "poster1.jpg",
          additionalInfo: "Some additional information about Movie 1",
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
          title: "Movie 1",
          theater: "Theater A",
          showDate: new Date("2023-07-20"),
          showTimes: "10:00 AM",
          ticketPrice: 10,
          seatAvailability:  30 
        },
        {
          title: "Movie 1",
          theater: "Theater B",
          showDate: new Date("2023-07-20"),
          showTimes: "10:00 PM",
          ticketPrice: 10,
          seatAvailability:  30 ,
        },
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