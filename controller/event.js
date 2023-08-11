const route = require('express').Router()
const events = require('../model/event');
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempEvent.hbs"), "utf8") 


let transporter = {
    service: 'gmail',
    auth: {
    user: 'chatbotmira0@gmail.com' , 
    pass: 'sqnm cylz knbp ukma', 
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


route.post('/saveEvent',(req,res)=>{
    console.log(req.body);
    events.create(req.body);
    console.log("Event Added");
    res.sendStatus(200);
})


route.post("/eventMail", (req, res) => {
    const {email,name,phone,date} = req.body;
    console.log(req.body);
      const htmlToSend = template({ 
        name:name,
        phone:phone,
        date:date.split("T")[0]
      });
      const mailOptions = {
          from: 'chatbotmira0@gmail.com',
          to: email,
          subject: 'Hosting Event Details',
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