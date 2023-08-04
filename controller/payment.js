const route = require('express').Router()

route.post('/delay', (req, res) => {
    setTimeout(() => {
      res.send('Response after 20 seconds delay');
    }, 1000); 
  });

module.exports = route