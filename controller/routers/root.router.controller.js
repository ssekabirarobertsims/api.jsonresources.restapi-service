"use strict";
debugger;
const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
  response.contentType = "text/html";
  response.statusCode = 200;

  request
    ? response.sendFile(
        require("node:path").join(__dirname, "../../view/src/index.html")
      )
    : (async function () {
        return;
      })();
});

router.route("/api/legal/information").get((request, response) => {
  response.contentType = "text/html";
  response.statusCode = 200;

  request
    ? response.jsonp(require("../../model/json/api.information.json"))
    : (async function () {
        return;
      })();
});

module.exports = router;
