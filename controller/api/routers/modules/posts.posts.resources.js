"use strict";
debugger;
const format = require("date-fns").format;

module.exports = async function (request, response) {
   response.type("Application/json");
  response.statusCode = 200;
  
  try {
    const { title, post } = request.body;

    if (!title) {
      return response.status(400).jsonp({
        message: "Title is required!",
        error: "Bad request",
        status: 400,
        contentType: "Application/json",
        message: "Bad request",
      });
    }

    if (!post) {
      return response.status(400).jsonp({
        message: "Post is required!",
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
