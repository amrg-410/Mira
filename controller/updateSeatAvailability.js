const Movie = require('../model/movie')

const makeBookingAndUpdateSeatAvailability = (movieId, showDate, showTime) => {
  Movie.findById(movieId)
    .then((bookedMovie) => {
      if (!bookedMovie) {
        console.log('Movie not found.');
        return;
      }
      const bookedShow = bookedMovie.seat_availability.find(show =>
        show.show_time === showTime && show.show_date.toISOString() === showDate.toISOString()
      );
      if (!bookedShow) {
        console.log('Show time not found for this movie and date.');
        return;
      }
      if (bookedShow.available_seats > 0) {
        bookedShow.available_seats--;
        return bookedMovie.save();
      } 
      else {
        console.log('No available seats for this show time and date.');
        return Promise.resolve();
      }
    })
    .then(() => {
      console.log('Booking successful. Seat availability updated.');
    })
    .catch((error) => {
      console.error('Error making booking and updating seat availability:', error);
    });
};
