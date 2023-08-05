function isDatePassed(givenDate) {
    const currentDate = new Date();
    const [year, month, day] = givenDate.split('-').map(Number);
    const givenDateObject = new Date(year, month - 1, day);
    if (givenDateObject < currentDate) {
      return true;
    }  
    else {
      return false;
    }
}


module.exports = isDatePassed
  