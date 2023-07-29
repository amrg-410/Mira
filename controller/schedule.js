const moment = require('moment');
const shows = require('../model/shows');
const nodeCron = require('node-cron');

function deleteOldData() {
  const currentDate = moment().startOf('day');
  const previousDate = moment(currentDate).subtract(1, 'days');

  return shows.deleteMany({ showDate: { $lt: previousDate } })
    .then(() => {
      console.log('Data with showDate less than current date deleted.');
    })
    .catch(error => {
      console.error('Error while deleting data:', error);
    });
}

function addDataForDayAfterTomorrow(currentDate) {
  const dayAfterTomorrow = moment(currentDate).startOf('day').add(3, 'days'); // 3 days from now

  return shows.find({ showDate: { $gt: currentDate } })
    .then(existingData => {
      if (!existingData || existingData.length === 0) {
        const newDataPromises = existingData.map(data => {
          const newData = {
            title: data.title,
            theater: data.theater,
            showDate: dayAfterTomorrow,
            showTimes: data.showTimes,
            ticketPrice: data.ticketPrice,
            seatAvailability: 30,
          };

          return shows.create(newData)
            .then(() => {
              console.log('New data for the day after tomorrow added.');
            })
            .catch(error => {
              console.error('Error while adding new data:', error);
            });
        });

        return Promise.all(newDataPromises);
      } else {
        console.log('Data for the day after tomorrow already exists.');
        return Promise.resolve();
      }
    })
    .catch(error => {
      console.error('Error while fetching data:', error);
    });
}

function scheduleJobs() {
  const deleteJob = '0 1 * * *';
  const addJob = '0 23 * * *';

  nodeCron.schedule(deleteJob, () => {
    deleteOldData()
      .catch(error => {
        console.error('Error in deleteOldData:', error);
      });
  });

  nodeCron.schedule(addJob, () => {
    addDataForDayAfterTomorrow(moment().startOf('day'))
      .catch(error => {
        console.error('Error in addDataForDayAfterTomorrow:', error);
      });
  });

  console.log('Scheduled jobs to run daily.');
}

scheduleJobs();

module.exports = nodeCron.schedule;
