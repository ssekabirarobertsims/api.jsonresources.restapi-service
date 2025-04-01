"use strict";
debugger;
const nodemailer = require("nodemailer");
require("dotenv").config();
require("dotenv").configDotenv();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: Boolean(false),
  },
});

// ********* //
function SendLoginMail(subject, to) {
  transporter.sendMail({
    to: to,
    subject: subject,
    html: ``,
    text: "",
  });
}

// ************* //
function SendSignupMail(subject, to) {
  transporter.sendMail({
    to: to,
    subject: subject,
    html: ``,
    text: "",
  });
}

module.exports = { SendLoginMail, SendSignupMail };
