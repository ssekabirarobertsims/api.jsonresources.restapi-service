"use strict";

// Load environment variables from .env file
require("dotenv").config();

// Import required modules and utilities
const { v4: uuid } = require("uuid"); // For generating unique IDs
const format = require("date-fns").format; // For formatting dates
const bcrypt = require("bcrypt"); // For password hashing (not used in this file)
const validator = require("validator"); // For validating email format
const poolConnection = require("../../../model/connection/model.connection"); // Database connection
const mailer = require("../middleware/mail/nodemailer.middleware.controller"); // Email sending utility
const jsonwebtoken = require("jsonwebtoken"); // For JWT token creation

// Main controller function for issuing authentication tokens
module.exports = async function (request, response) {
  response.type("application/json"); // Set response type to JSON

  try {
    const { username, email } = request.body; // Extract username and email from request body

    // Validate input fields: username must be provided and not empty
    if (!username || username.trim() === "") {
      return response.status(400).jsonp({
        error: "Bad request",
        message: "Please provide your username!",
        status_code: 400,
        request_id: uuid(),
        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
      });
    }

    // Validate input fields: email must be provided and not empty
    if (!email || email.trim() === "") {
      return response.status(400).jsonp({
        error: "Bad request",
        message: "Please provide your email!",
        status_code: 400,
        request_id: uuid(),
        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
      });
    }

    // Validate email format using validator library
    if (!validator.isEmail(email)) {
      return response.status(400).jsonp({
        error: "Bad request",
        message: "Invalid email format!",
        status_code: 400,
        request_id: uuid(),
        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
      });
    }

    // Generate a JWT token with user info and expiration
    const token = jsonwebtoken.sign(
      {
        token_id: uuid(), // Unique token ID
        username,
        email
      },
      process.env.REFRESH_TOKEN_SECRETE_KEY, // Secret key from environment variables
      {
        expiresIn: "10d", // Token expiration time in 10 days
      }
    );

    // Optionally store token issue details in the database (currently not commented out)
    await poolConnection.query(
      `
    		INSERT INTO token_issues (id, username, email, _date, _time) VALUES (?, ?, ?, ?, ?);
    	`,
      [
    	uuid(),
    	username,
    	email,
    	format(new Date(), "yyyy-MM-dd"),
    	format(new Date(), "HH:mm:ss"),
      ]
    );

    // Optionally send an email notification to the user (currently not commented out)
    mailer(email, username, token);

    // Respond with success message and issued token after a short delay
    setTimeout(() => {
      response.status(201).jsonp({
        error: undefined,
        message: "Token issued successful!", 
        data: {
            email,
            username,
            token
        },
        status_code: 201,
        request_id: uuid(),
        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
      });
    }, 1);
  } catch (error) {
    // Handle unexpected errors and respond with a 500 status
    console.error(error);
    response.status(500).jsonp({
      error: error.message,
      message: "Internal server error",
      status_code: 500,
      request_id: uuid(),
      date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
    });
  } finally {
    // Log that the token issuing process was triggered
    console.log("api token issuing triggered!");
  }
};
