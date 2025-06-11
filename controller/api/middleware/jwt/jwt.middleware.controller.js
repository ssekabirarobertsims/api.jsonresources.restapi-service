"use strict";

const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const format = require("date-fns").format;

module.exports = async function (request, response, next) {
  try {
    // require authorization headers
    const authorizationHeaders = request.headers["authorization"];
    
    // Validate authorization headers
    if (!authorizationHeaders) {
      return response.status(403).json({
        status_code: 403,
        message: "Please provide authorization headers!",
        error: "Authorization headers not available!",
        request_id: uuid(),
        date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
      });
    }
    
    // split the sent token from the Bearer in the authorization headers
    const token = authorizationHeaders.split(" ")[1];
    
    // Validate token presence in the authorization headers
    if (!token) {
      return response.status(400).json({
        status_code: 400,
        message: "Please provide a token in the request headers!",
        error: "Bad request",
        request_id: uuid(),
        date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
      });
    }

    // Validate token decoding
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.REFRESH_TOKEN_SECRETE_KEY
    );

    if (!decodedToken) {
      return response.status(403).json({
        status_code: 403,
        message: "Provide a token to be decoded!",
        error: "Token not decoded",
        request_id: uuid(),
        date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
      });
    }

    // Validate token structure
    if (jsonwebtoken.decode(token) === null) {
      return response.status(402).json({
        status_code: 402,
        message: "Failed to decode token!",
        error: "Invalid token",
        request_id: uuid(),
        date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
      });
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return response.status(400).jsonp({
      error: error.message,
      information: {
        data: error.message,
      },
      message: "Bad request",
      status_code: 400,
      request_id: uuid(),
      date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
    });
  }
};
