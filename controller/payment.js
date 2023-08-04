const route = require('express').Router()

route.get('/delay', (req, res) => {
    setTimeout(() => {
      res.send('Response after 20 seconds delay');
    }, 20000); 
  });

module.exports = route