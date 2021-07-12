const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// GET feedback page
router.get('/', function(req, res, next) {
  res.render('feedback');
});

router.post('/', function(req, res, next) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // secure port
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  let textBody = `MESSAGE: ${req.body.message}`;
  let htmlBody = `<p>${req.body.message}</p>`;
  let mailOptions = {
    from: 'Anonymous', 
    to: process.env.EMAIL, 
    subject: 'Mail from Feedback Form',
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