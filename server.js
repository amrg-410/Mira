const express = require("express");
const mongoose = require('mongoose')
const app = express()
app.use(express.urlencoded({extended:true}));   

const url = "mongodb+srv://chatbotmira0:Mira_1207@malldetails.3miwqu3.mongodb.net/Cinema?retryWrites=true&w=majority";

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


//route  to movies 
const movies=require('./controller/movies')
app.use(movies)


//route  to showTimings  
const showTimings=require('./controller/showTimings')
app.use(showTimings)


//route  to book  
const book=require('./controller/book')
app.use(book)


//route  to updateSeats
const updateSeats=require('./controller/updateSeats')
app.use(updateSeats)


//route  to payment
const payment=require('./controller/payment')
app.use(payment)


// route  to snacks  
const snacks=require('./controller/snacks')
app.use(snacks)


// route  to cancel  
const cancel=require('./controller/cancel')
app.use(cancel)


// route  to review  
const cancel=require('./controller/review')
app.use(review)


app.get('/',(req,res)=>{
    res.send("YES")
})