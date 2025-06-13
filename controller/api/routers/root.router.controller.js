"use strict";
debugger;
const express = require("express");
const router = express.Router();

// Root route: serves the main HTML page for the API
router.route("/").get((request, response) => {
  response.type("text/html");
  response.statusCode = 200;

  try {
    // If request exists, send the main index.html file
    return request
      ? response.sendFile(
          require("node:path").join(__dirname, "../../../view/src/index.html")
        )
      : (async function () {
          return;
        })();
  } catch (error) {
    // Handle unexpected errors and return a 500 response
    return response.status(500).jsonp({
            message: "Internal server error",
            error: error.message,
            status: 500,
            now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
            request_id: uuid(),
          });
  }
});

// Legal information route: returns API legal/information JSON
router.route("/legal/information").get((request, response) => {
  response.type("text/html");
  response.statusCode = 200;

 try {
   // If request exists, send the legal information JSON
   return request
     ? response.jsonp(require("../../../model/json/api.information.json"))
     : (async function () {
         return;
       })();
 } catch (error) {
  // Handle unexpected errors and return a 500 response
  return response.status(500).jsonp({
        message: "Internal server error",
        error: error.message,
        status: 500,
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        request_id: uuid(),
      });
 }
});

// Route for issuing authentication tokens (POST only)
router.route("/secrete/token/issue")
      .post(require("../authentication/api.token.issue.authentication.controller"));

// Export the router to be used in the main application
module.exports = router;
