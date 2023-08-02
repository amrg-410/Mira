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

module.exports=isTimePassed