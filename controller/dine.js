const route = require('express').Router()
const dine = require('../model/dine');


route.post('/saveDine',(req,res)=>{
    console.log(req.body);
    dine.create(req.body);
    console.log("Dine Saved");
    res.sendStatus(200);
})


module.exports=route