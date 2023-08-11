const route = require('express').Router()
const events = require('../model/event');


route.post('/saveEvent',(req,res)=>{
    console.log(req.body);
    events.create(req.body);
    console.log("Event Added");
    res.sendStatus(200);
})


module.exports=route