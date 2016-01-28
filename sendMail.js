var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// var smtpConfig = {
//     service: 'Gmail', 
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'wenzhang.seio@gmail.com',
//         pass: 'zw198787'
//     }
// };
// debugger
// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport(gcc);
var transporter = nodemailer.createTransport((smtpTransport({
    host: 'smtp.gmail.com',
    secureConnection: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: 'wenzhang.seio@gmail.com',
        pass: 'zw198787'
    }
})));

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'wenzhang.seio@gmail.com', // sender address
    to: '270465007@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
