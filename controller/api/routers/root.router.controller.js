"use strict";
debugger;
const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
  response.type("text/html");
  response.statusCode = 200;

  try {
    return request
      ? response.sendFile(
          require("node:path").join(__dirname, "../../../view/src/index.html")
        )
      : (async function () {
          return;
        })();
  } catch (error) {
    return response.status(500).jsonp({
            message: "Internal server error",
            error: error.message,
            status: 500,
            now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
            request_id: uuid(),
          });
  }
});

router.route("/legal/information").get((request, response) => {
  response.type("text/html");
  response.statusCode = 200;

 try {
   return request
     ? response.jsonp(require("../../../model/json/api.information.json"))
     : (async function () {
         return;
       })();
 } catch (error) {
  return response.status(500).jsonp({
        message: "Internal server error",
        error: error.message,
        status: 500,
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        request_id: uuid(),
      });
 }
});

router.route("/secrete/token/issue")
      .post(require("../authentication/api.token.issue.authentication.controller"));

module.exports = router;
