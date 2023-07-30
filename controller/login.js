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


route.post('/login', (req, res) => {
  console.log(req.body);
  user.findOne({emailId : req.body.emailId})
  .then((result)=>{
    console.log(result)
    if(result.password === req.body.password){
        res.send(result);
    }
    else{
        res.sendStatus(401);
    }   
  })
  .catch(err=>{
    console.log(err);
    res.sendStatus(404);
  })
});


route.post("/forgotPassMail", (req, res) => {
    console.log(req.body);
    const otp = generateOTP();
    console.log(otp);
    user.findOne({
        emailId: req.body.emailId
    })
    .then((result)=>{
        const htmlToSend = template({ name: result.name, otp: otp });
        const mailOptions = {
            from: 'chatbotmira0@gmail.com',
            to: req.body.emailId,
            subject: 'OTP Verification to Change Password',
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
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});


route.post("/changePassword",(req,res)=>{
    console.log(req.body);
    user.findOne({
        emailId: req.body.emailId
    })
    .then((result)=>{
        result.password = req.body.password;
        result.save();
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
})


module.exports=route