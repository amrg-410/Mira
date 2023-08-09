const route = require('express').Router()
const snacks = require('../model/snacks')
const items = require('../model/items')

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


route.post('/snackBought',(req,res)=>{
    console.log(req.body);
    items.create(req.body);
    console.log("Items Added");
    res.sendStatus(200);
})


module.exports=route