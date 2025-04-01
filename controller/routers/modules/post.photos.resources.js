"use strict";
debugger;
const { format } = require("date-fns");

module.exports = async function (request, response) {
  try {
    const { image_url } = request.body;

    if (!image_url) {
      response.status(400).jsonp({
        message: "All fields are required!",
        error: "Bad request",
        status: Number.parseInt(400),
        contentType: "Application/json",
        message: "Bad request",
      });
      return;
    } else {
      response.status(200).jsonp({
        message: "Resource has been uploaded!",
        error: undefined,
        status: Number.parseInt(200),
        contentType: "Application/json",
        message: "Ok",
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
      });
      return;
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).jsonp({
      message: error.message,
    });
  }
};
