"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();
require("dotenv").configDotenv();
const format = require("date-fns").format; // For formatting dates

// Configure the nodemailer transporter for sending emails using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.MAILER, // Email address from environment variables
    pass: process.env.MAILER_PASSWORD, // Password from environment variables
  },
  tls: {
    rejectUnauthorized: Boolean(false), // Accept self-signed certificates
  },
});

// Exported async function to send an email
module.exports = async (receiver, username, token) => {
  try {
    // Attempt to send an email to the receiver
    mailerTransporter.sendMail({
      to: receiver, // Recipient's email address
      sender: process.env.MAILER, // Sender's email address
      html: `
        <h1>Welcome to our service, ${username}!</h1>
        <p>
          You have successfully issued a token using your email address: ${receiver} as ${username}. 
          Please keep this information safe and secure as it is important for your account security
          and access to the api resources. The token is valid for a limited time of 10 days, so make sure to use it promptly.
        </p>
        <p>Token Issue Email: ${receiver}</p>
        <p>Token Issue Username: ${username}</p>
        <p>Token Issue Date: ${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}</p>
        <p>Token: ${token}</p>
        <strong>
          Note: This email is sent to confirm your token issuance and does not require any action from you.
        </strong>
      `, // HTML content of the email
      subject: `Token Issued for ${username}`, // Subject of the email
    });

    console.log(`sent email to ${receiver}`); // Log success
  } catch (error) {
    // Log any errors that occur during sending
    console.log(error?.message);
  } finally {
    // Always log that the email send attempt was made
    console.log("email was sent to:", receiver);
  }
};
