const route = require('express').Router()
const snacks = require('../model/snacks')

route.post('/fetchSnacks',(req,res)=>{
    res.send(snacks)
})


module.exports=route