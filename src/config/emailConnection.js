const nodemailer = require('nodemailer');
const {MAIL_HOST, MAIL_PORT, MAIL_SERVER, MAIL_PASS, MAIL_SECURE} = process.env;

let transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE,
    auth: {
        user: MAIL_SERVER,
        pass: MAIL_PASS,
    },
});


module.exports = transporter;