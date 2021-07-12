const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// Get contact form
router.get('/', function(req, res) {
  res.render('contact');
});

router.post('/', function(req, res) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // secure port
    secure: true,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASS
    }
  });

  // Craft response form
  let textBody = `FROM: ${req.body.name}; EMAIL: ${req.body.email}; MESSAGE: ${req.body.message}`;
  let htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${req.body.name} <a href='mailto:${req.body.email}'>${req.body.email}</a></p><p>${req.body.message}</p>`;
  let mailOptions = {
    from: `${req.body.email}`, 
    to: process.env.EMAIL,
    subject: 'Mail from Contact Form',
    text: textBody,
    html: htmlBody
  };

  // Send email with transporter options
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.json({message: 'error occurred'});
    } else {
      res.json({message: `message sent with ID: ${info.messageId}` });
    }
  })
});

module.exports = router;