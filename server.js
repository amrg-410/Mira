const express = require("express");
const mongoose = require('mongoose')
const app = express()
app.use(express.urlencoded({extended:true}));   

const url = "mongodb+srv://chatbotmira0:Mira_1207@malldetails.3miwqu3.mongodb.net/";

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


//route  to Login  
const login=require('./controller/login')
app.use(login)


app.get('/',(req,res)=>{
    res.send("YES")
})