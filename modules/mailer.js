const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'ragempdmil@gmail.com',
        pass: 'yuvalofek!'
    }
});