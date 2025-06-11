"use strict";
debugger;
const validator = require("validator");
const format = require("date-fns").format;

module.exports = async function (request, response) {
   response.type("Application/json");
  response.statusCode = 201;
  
  try {
    const { first_name, last_name, email, job } = request.body;

    if (!first_name) {
      return response.status(400).jsonp({
        message: "First name required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    } 

    if (!last_name) {
      return response.status(400).jsonp({
        message: "Last name is required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    } 

    if (!email) {
      return response.status(400).jsonp({
        message: "Email is required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    } 

    if (!job) {
      return response.status(400).jsonp({
        message: "Job is required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    } 
    
    if (!validator.isEmail(email)) {
      return response.status(400).jsonp({
        message: "Please provide a valid email resource!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    } 

    return response.status(201).jsonp({
        message: "Resource has been uploaded!",
        error: undefined,
        status: 200,
        contentType: "Application/json",
        message: "Created",
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
      });
  } catch (error) {
    console.log(error.message);
   return response.status(500).jsonp({
           message: "Internal server error",
           error: error.message,
           status: 500,
           now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
           request_id: uuid(),
         });
  }
};
