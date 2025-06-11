"use strict";

require("dotenv").config();
const { v4: uuid } = require("uuid");
const format = require("date-fns").format;
const bcrypt = require("bcrypt");
const validator = require("validator");
const poolConnection = require("../../../model/connection/model.connection");
const mailer = require("../middleware/mail/nodemailer.middleware.controller");
const jsonwebtoken = require("jsonwebtoken");

module.exports = async function (request, response) {
  response.type("application/json");

  try {
	const { username, email } = request.body;

	// Validate input fields
	if (!username || username.trim() === "") {
	  return response.status(400).jsonp({
		error: "Bad request",
		message: "Please provide your username!",
		status_code: 400,
		request_id: uuid(),
		date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
	  });
	}

	// validate email
	if (!email || email.trim() === "") {
	  return response.status(400).jsonp({
		error: "Bad request",
		message: "Please provide your email!",
		status_code: 400,
		request_id: uuid(),
		date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
	  });
	}

	// validate sent email if its a valid email using validator
	if (!validator.isEmail(email)) {
	  return response.status(400).jsonp({
		error: "Bad request",
		message: "Invalid email format!",
		status_code: 400,
		request_id: uuid(),
		date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
	  });
	}

	 // Generate a JWT token
		const token = jsonwebtoken.sign(
		  {
			token_id: uuid(),
			username,
			email
		  },
		  process.env.REFRESH_TOKEN_SECRETE_KEY,
		  {
			expiresIn: "10d", // Token expiration time in 10 days
		  }
		);

	// if everything is all up, store issuing details in the database for a new issue
	// await poolConnection.query(
	//   `
	// 		INSERT INTO token_issues (id, username, email, _date, _time) VALUES (?, ?, ?, ?, ?);
	// 	`,
	//   [
	// 	uuid(),
	// 	username,
	// 	email,
	// 	format(new Date(), "yyyy-MM-dd"),
	// 	format(new Date(), "HH:mm:ss"),
	//   ]
	// );

	
	// send email to user with email
	// mailer(email, username, adminsLength[0].length, code);

	// Respond with success message
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
	console.error(error);
	response.status(500).jsonp({
	  error: error.message,
	  message: "Internal server error",
	  status_code: 500,
	  request_id: uuid(),
	  date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
	});
  } finally {
	console.log("api token issuing triggered!");
  }
};
