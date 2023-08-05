const route = require('express').Router()
const snacks = require('../model/snacks')

route.post('/fetchSnacks',(req,res)=>{
    res.send({
        data:snacks
    })
})


module.exports=route