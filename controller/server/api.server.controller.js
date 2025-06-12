"use strict";
debugger;
const express = require("express");
const application = express();
const http = require("node:http");
const server = http.createServer(application);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("dotenv").configDotenv();
const apicache = require("apicache");
const cache = apicache.middleware;

const cors = require("cors");

application.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

application.use(function (request, response, next) {
  response.contentType = "Application/json";

  response.setHeader("Access-Control-Allow-Credentials", Boolean(true));
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, UPDATE"
  );

  // set cookies
  response.cookie("api", "api.jsonresources.restapi", {
    httpOnly: true,
    maxAge: 100 * 1000 * 60 * 60 * 60,
  });

  next();
});

application.use(bodyParser.urlencoded({ extended: Boolean(false) }));
application.use(express.urlencoded({ extended: Boolean(false) }));
application.use(cookieParser());
application.use(bodyParser.json());
application.use(express.json());
application.use(
  express.static(require("node:path").join(__dirname, "../../view"))
);
application.use(
  express.static(require("node:path").join(__dirname, "../../public"))
);
application.use(
  express.static(require("node:path").join(__dirname, "../../public/photos"))
);
application.use(
  express.static(
    require("node:path").join(__dirname, "../../public/stylesheets")
  )
);

const fsp = require("node:fs/promises");
const fs = require("node:fs");

fs.readdir(
  require("node:path").join(__dirname, "../../view/"),
  { encoding: "utf8" },
  (error, data) => {
    error
      ? console.log("error while reading dir ../../view/", error.message)
      : console.log("read dir ../../view/");
  }
);

fs.readdir(
  require("node:path").join(__dirname, "../../public/"),
  { encoding: "utf8" },
  (error, data) => {
    error
      ? console.log("error while reading dir ../../public/", error.message)
      : console.log("read dir ../../public/");
  }
);

fs.readdir(
  require("node:path").join(__dirname, "../../public/photos/"),
  { encoding: "utf8" },
  (error, data) => {
    error
      ? console.log(
          "error while reading dir ../../public/photos/",
          error.message
        )
      : console.log("read dir ../../public/photos/");
  }
);

fs.readdir(
  require("node:path").join(__dirname, "../../public/stylesheets/"),
  { encoding: "utf8" },
  (error, data) => {
    error
      ? console.log(
          "error while reading dir ../../public/stylesheets/",
          error.message
        )
      : console.log("read dir ../../public/stylesheets/");
  }
);

application.use("/v1", require("../api/routers/root.router.controller"));
application.use(
  "/v1/resources",
  cache("5 minutes"),
  require("../api/routers/resources.routes.controller")
);

application.use(require("../api/middleware/error/404.middleware.controller"));

application.set("port", 3500);
const events = require("node:events");
const emitter = new events();
emitter.on("start", () => console.log("server listening to port", application.get("port") || process.env.PORT));

server.listen(application.get("port") || process.env.PORT, () => {
  server.listening ? emitter.emit("start") : console.log("server not running!");
});

module.exports = application;
