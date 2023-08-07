const route = require('express').Router()
const Booking = require('../model/booking');
const isDatePassed = require('./isDatePassed')
const isTimePassed = require('./isTimePassed')
const getCurrentDate = require('./getCurrentDate')
const show = require('../model/shows')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempTicket.hbs"), "utf8") 


let transporter = {
    service: 'gmail',
    auth: {
    user: 'chatbotmira0@gmail.com' , 
    pass: 'sqnm cylz knbp ukma', 
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


const generateBookingId = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BKG-${timestamp}-${randomDigits}`;
};

route.post('/book', (req, res) => {
  const { title, showDate, theater, showTime, seats, user, paymentId,moviePoster,amount} = req.body;
  console.log(req.body);
  const bookingId = generateBookingId();
  const newBooking = new Booking({
    bookingId,
    title,
    showDate,
    theater,
    showTime,
    seats,
    user,
    paymentId,
    moviePoster,
    amount
  });

  newBooking.save()
    .then(() => {
      res.json({ message: 'Booking successful.', bookingId }); 
    })
    .catch((error) => {
      console.error('Error making booking:', error);
      res.status(500).json({ error: 'Booking failed.' });
    });
});


route.post("/fetchBooking",(req,res)=>{
    Booking.find({user:req.body.emailId})
    .then((book)=>{
      if(book.length === 0){
        res.sendStatus(404) ;
      }
      else{
        console.log(book)
        let responseData=[];
        const currentDate = getCurrentDate();
        console.log(currentDate);
          for(var i=0;i<book.length;i++){
            var temp = book[i].showDate.toString();
            console.log(temp);
            if(book[i].showDate === currentDate){
              const givenTime = book[i].showTimes;
              const isPassed = isTimePassed(givenTime);
              if (isPassed) {
                console.log("Show is in past");
                continue;
              } 
            }
            else if(isDatePassed(temp.split('T')[0])){
              continue;
            }
            responseData.push(book[i]);
          }
          if(responseData.length === 0){
            res.status(503).json({message: "No Bookings Found"});
          }
          else{
            res.send(responseData);
          }
      }
    })
})


route.post('/cancel',(req,res)=>{
  Booking.deleteOne({
    bookingId:req.body.bookingId
  })
  .then((result) => {
    console.log("Result : "+result);
    res.send(result); 
  })
  .catch((error) => {
    console.error('Error cancel booking:', error);
    res.status(500).json({ error: 'Cancelling failed.' });
  });
})


route.post("/bookMail", (req, res) => {
    const bookingId = req.body.bookingId;
    console.log(req.body);
    Booking.findOne({bookingId:bookingId})
    .then((books)=>{
      const htmlToSend = template({ 
        img: books.moviePoster, 
        title: books.title, 
        theater: books.theater,
        date: books.showDate,
        time: books.showTime,
        seats: books.seats,
        amount: books.amount
      });
      const mailOptions = {
          from: 'chatbotmira0@gmail.com',
          to: books.user,
          subject: 'Booking Details',
          html: htmlToSend
      };
      smtpTransport.sendMail(mailOptions)
          .then((info) => {
              res.sendStatus(200);
          })
          .catch((err) => {
              console.log('gmail');
              console.log(err);
              res.sendStatus(400);
          });
    })
    
});


module.exports = route;