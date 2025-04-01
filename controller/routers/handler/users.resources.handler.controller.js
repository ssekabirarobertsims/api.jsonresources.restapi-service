"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();

router
  .route("/users")
  .get((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    try {
      request
        ? response.jsonp({
            data: require("../../../model/json/users.resources.json"),
            error: undefined,
            status: Number.parseInt(200),
            category: "users",
            length: Number.parseInt(
              require("../../../model/json/users.resources.json").length
            ),
            contentType: "Application/json",
            root_link: "/resources/users",
            message: "Ok",
            now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
          })
        : (async function () {
            return;
          })();
    } catch (error) {
      console.log(error.message);
      response.status(500).jsonp({
        message: error.message,
      });
    }
  })
  .post(require("../modules/post.users.resources"));

// ****** //
router
  .route("/users/:id")
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../model/json/users.resources.json"
    );
  })
  .patch((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource =
      require("../../../model/json/users.resources.json").find((resource) => {
        return resource.id === request.params.id;
      });

    try {
      const { first_name, last_name, email, job } = request.body;

      if (!first_name || !last_name || !email || !job) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: Number.parseInt(400),
          contentType: "Application/json",
          message: "Bad request",
        });
        return;
      } else if (!validator.isEmail(email)) {
        response.status(400).jsonp({
          message: "Please provide a valid email resource!",
          error: "Bad request",
          status: Number.parseInt(400),
          contentType: "Application/json",
          message: "Bad request",
        });
        return;
      } else if (!FoundResource) {
        response.status(404).jsonp({
          message: "No such resource with id was found!",
          error: "Not Found!",
          status: Number.parseInt(404),
          contentType: "Application/json",
          message: "Not Found!",
        });
      } else {
        response.status(201).jsonp({
          data: `Resource with id ${FoundResource.id} has been updated!`,
          error: undefined,
          status: Number.parseInt(200),
          contentType: "Application/json",
          message: "Created",
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
  })
  .delete((request, response) => {
    require("../modules/delete.resource.controller")(
      request,
      response,
      "../../../model/json/users.resources.json"
    );
  })
  .put((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource =
      require("../../../model/json/users.resources.json").find((resource) => {
        return resource.id === request.params.id;
      });

    try {
      const { first_name, last_name, email, job } = request.body;

      if (!first_name || !last_name || !email || !job) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: Number.parseInt(400),
          contentType: "Application/json",
          message: "Bad request",
        });
        return;
      } else if (!validator.isEmail(email)) {
        response.status(400).jsonp({
          message: "Please provide a valid email resource!",
          error: "Bad request",
          status: Number.parseInt(400),
          contentType: "Application/json",
          message: "Bad request",
        });
        return;
      } else if (!FoundResource) {
        response.status(404).jsonp({
          message: "No such resource with id was found!",
          error: "Not Found!",
          status: Number.parseInt(404),
          contentType: "Application/json",
          message: "Not Found!",
        });
      } else {
        response.status(201).jsonp({
          data: `Resource with id ${FoundResource.id} has been updated!`,
          date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
        });
        return;
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).jsonp({
        message: error.message,
      });
    }
  });

module.exports = router;
