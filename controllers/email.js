const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const OTP = require('../dbmodels/otp');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})
transporter.use(
    'compile',
    hbs({
        viewEngine: {
            extname: '.handlebars',
            partialsDir: path.resolve(__dirname, '../email-templates/'),
            defaultLayout: false
        },
        viewPath: path.join(__dirname, '../email-templates/'),
        extName: '.handlebars'
    })
);

function getMailOptions(recieveremail, emailContent) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: recieveremail,
        subject: emailContent.subject,
        template: emailContent.templateName,
        context: emailContent.context
    };

    return mailOptions
}

function getEmailSubjectBody(type, details, email) {
    emailContent = {
        subject: '',
        templateName: '',
        context: ''
    };
    if (type == 'apply') {
        emailContent.subject = `Application Confirmation: ${details.position}`;
        emailContent.templateName = 'apply-email';
        emailContent.context = details;
    } else if (type = 'opt') {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = Date.now() + 1000*60*5;
        details = {
            otp: otp,
            expireIn: otpExpier,
            email: email
        }
        emailContent.subject = 'OTP for Password Reset';
        emailContent.templateName = 'otp-email';
        emailContent.context = details;
    }
    return emailContent;
}

const sendEmail = async (req, res) => {
    const email = req.user.email;
    const { type, details } = req.body;
    const emailContent = getEmailSubjectBody(type, details, email);
    const mailOptions = getMailOptions(email, emailContent)
    if(type=='otp'){
        await OTP.create(emailContent.context)
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            throw new Error();
        } else {
            res.status(StatusCodes.OK).json({ msg: 'Email sent successfully', info: info.response })
        }
    });
}

module.exports = {
    sendEmail
}