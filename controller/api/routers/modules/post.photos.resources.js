"use strict";
debugger;
const { format } = require("date-fns");

module.exports = async function (request, response) {
  response.type("Application/json");
  response.statusCode = 200;
  
  try {
    const { image_url } = request.body;

    if (!image_url) {
      return response.status(400).jsonp({
        message: "All fields are required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    }

    return response.status(200).jsonp({
        message: "Resource has been uploaded!",
        error: undefined,
        status: 200,
        contentType: "Application/json",
        message: "Ok",
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
