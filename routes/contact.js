const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

/* GET Contact page */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', function(req, res, next) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // secure port
    secure: true,
    auth: {
      user: process.env.EMAIL, // my gmail acct 
      pass: process.env.EMAIL_PASS
    }
  });

  let textBody = `FROM: ${req.body.name}; EMAIL: ${req.body.email}; MESSAGE: ${req.body.message}`;
  let htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${req.body.name} <a href='mailto:${req.body.email}'>${req.body.email}</a></p><p>${req.body.message}</p>`;
  let mailOptions = {
    from: `${req.body.email}`, 
    to: process.env.EMAIL,
    subject: 'Mail from Contact Form',
    text: textBody,
    html: htmlBody
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.json({message: 'error occurred, please try again'});
    } else {
      res.json({message: `message sent with ID: ${info.messageId}` });
    }
  })
});

module.exports = router;