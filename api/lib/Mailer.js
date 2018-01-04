var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config');

var transporter = nodemailer.createTransport(
    smtpTransport('smtps://'+config.emailer.user+':'+config.emailer.pass+'@smtp.gmail.com')
);


function mailingService( obj, subject, html_text ){
  return new Promise(function (resolve, reject) {
    transporter.sendMail({
        from: config.emailUserId, // sender email address example abc@yahoo.com
        to: obj.email, // client email address to which email need to deliver
        subject: subject, // your subject
        html: html_text // if u want to send html template else just send text
      }, function(error, response) {
        if(error) return reject(error);
        return resolve(response)
      })
  })
}

module.exports = {
  mailingService
}
