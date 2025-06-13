"use strict";
debugger;
const path = require("node:path");

// Custom 404 error middleware to handle not found routes
module.exports = async function (request, response) {
  response.statusCode = 404; // Set HTTP status code to 404 (Not Found)
  // Set response content type based on request (defaults to text/html)
  response.type("text/html" ? "text/html" : "text/css" || "text/javascript");

  // Check if the client accepts HTML responses
  if (request.accepts("text/html")) {
    // Serve a custom 404 HTML page
    response
      .status(404)
      .sendFile(path.join(__dirname, "../../../../view/404.html"));
  } else if (request.accepts("application/json")) {
    // Respond with a JSON error message if JSON is accepted
    response.status(404).jsonp({
      message: "404 Not Found!",
    });
  } else if (request.accepts("text/plain")) {
    // Respond with a plain text error message if plain text is accepted
    response.status(404).send(String("404 Not Found!"));
  }
};
