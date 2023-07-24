const moment = require('moment');
const shows = require('../model/shows'); 

function deleteOldData() {
  const currentDate = moment().startOf('day'); 
  return shows.deleteMany({ showDate: { $lt: currentDate } })
    .then(() => {
      console.log('Data with showDate less than current date deleted.');
    })
    .catch(error => {
      console.error('Error while deleting data:', error);
    });
}


function addDataForDayAfterTomorrow() {
  const dayAfterTomorrow = moment().startOf('day').add(2, 'days'); 
  return shows.find({ showDate: dayAfterTomorrow.toDate() })
    .then(existingData => {
      if (!existingData) {
        const newData = {
          title: existingData.title,
          theater: existingData.theater,
          showDate: dayAfterTomorrow.toDate(),
          showTimes: existingData.showTimes,
          ticketPrice: existingData.ticketPrice,
          seatAvailability: existingData.seatAvailability,
        };
        return shows.create(newData)
          .then(() => {
            console.log('New data for the day after tomorrow added.');
          })
          .catch(error => {
            console.error('Error while adding new data:', error);
          });
      } else {
        console.log('Data for the day after tomorrow already exists.');
      }
    })
    .catch(error => {
      console.error('Error while fetching data:', error);
    });
}


function scheduleJobs() {

  const deleteJob = '0 0 * * *';
  node-cron.schedule(deleteJob, () => {
    deleteOldData()
      .then(scheduleAddJob) 
      .catch(error => {
        console.error('Error in deleteOldData:', error);
      });
  });

  console.log('Scheduled jobs to run daily.');
}


function scheduleAddJob() {
  const addJob = '0 1 * * *';
  node-cron.schedule(addJob, () => {
    addDataForDayAfterTomorrow()
      .catch(error => {
        console.error('Error in addDataForDayAfterTomorrow:', error);
      });
  });
}

scheduleJobs();
