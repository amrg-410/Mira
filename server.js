const express = require("express");
const mongoose = require('mongoose')
const app = express()
app.use(express.urlencoded({extended:true}));   

const url = "mongodb+srv://amrg_5612:Mongo_5612@botathon.8ytyjss.mongodb.net/Healthcare?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})
.then((res)=>{
    app.listen(4000,()=>{
        console.log('Bot Connected')
})
console.log('Success')})
.catch((err)=>{console.log(err)})


//route  to Signup  
const signup=require('./controller/signup')
app.use(signup)


app.get('/',(req,res)=>{
    res.send("YES")
})