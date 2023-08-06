const route = require('express').Router()
const snacks = require('../model/snacks')

route.post('/fetchSnacks',(req,res)=>{
    snacks.find()
    .then((snack)=>{
        res.send(snack)
    })
    .catch((error) => {
        console.error('Error in snacks :', error);
        res.status(500).json({ error: 'Snacks error.' });
    });
})


module.exports=route