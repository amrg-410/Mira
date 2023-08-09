const route = require('express').Router()
const Booking = require('../model/booking');
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempCancel.hbs"), "utf8") 


let transporter = {
    service: 'gmail',
    auth: {
    user: 'chatbotmira0@gmail.com' , 
    pass: 'sqnm cylz knbp ukma', 
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


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


route.post("/cancelMail", (req, res) => {
    const {name,title,date,user} = req.body;
    console.log(req.body);
      const htmlToSend = template({ 
        name:name,
        title: title, 
        date: date,
      });
      const mailOptions = {
          from: 'chatbotmira0@gmail.com',
          to: user,
          subject: 'Cancel Booking Details',
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
    
});


module.exports=route