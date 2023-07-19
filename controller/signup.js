const route = require('express').Router()
const user = require('../model/customer')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const generateOTP = require('./otpGenerator');
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempOtp.hbs"), "utf8") 


let transporter = {
    service: 'gmail',
    auth: {
    user: 'chatbotmira0@gmail.com' , 
    pass: 'sqnm cylz knbp ukma', 
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)



route.post("/sendOtpMail", (req, res) => {
    console.log(req.body);
    const otp = generateOTP();
    console.log(otp);
    const htmlToSend = template({ name: req.body.name, otp: otp });
    const mailOptions = {
        from: 'chatbotmira0@gmail.com',
        to: req.body.emailId,
        subject: 'OTP for Signup Verification',
        html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions)
        .then((info) => {
            res.send(otp);
        })
        .catch((err) => {
            console.log('gmail');
            console.log(err);
            res.sendStatus(400);
        });
});


route.post('/insert', async (req, res) => {
  console.log(req.body);
  user.create(req.body);
  res.send("User Created");
});



module.exports=route