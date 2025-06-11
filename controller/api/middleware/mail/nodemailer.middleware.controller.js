"use strict";

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

module.exports = async (receiver, username) => {
  try {
    mailerTransporter.sendMail({
      to: receiver,
      sender: process.env.MAILER,
      html: ``,
      subject: ``,
    });

    console.log(`sent email to ${receiver}`);
  } catch (error) {
    console.log(error?.message);
  } finally {
    console.log("email was sent to:", receiver);
  }
};
