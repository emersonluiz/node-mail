var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.json())

var smtp = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: ''
    },
    tls: {rejectUnauthorized: false},
    debug: true
});

app.post('/send', function(req, res) {
    var mailOptions={
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }
    smtp.sendMail(mailOptions, function(error, response) {
        if(error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent");
            res.end("sent");
        }
    });
});

app.listen(3000, function() {
    console.log("Listen on port 3000");
})