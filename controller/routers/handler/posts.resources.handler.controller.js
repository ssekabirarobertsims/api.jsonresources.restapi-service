"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();

router
  .route("/posts")
  .get((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    try {
      request
        ? response.jsonp({
            data: require("../../../model/json/posts.resources.json"),
            error: undefined,
            status: Number.parseInt(200),
            category: "posts",
            length: Number.parseInt(
              require("../../../model/json/posts.resources.json").length
            ),
            contentType: "Application/json",
            root_link: "/resources/posts",
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
  .post(require("../modules/posts.posts.resources"));

// ****** //
router
  .route("/posts/:id")
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../model/json/posts.resources.json"
    );
  })
  .patch((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource =
      require("../../../model/json/posts.resources.json").find((resource) => {
        return resource.id === request.params.id;
      });

    try {
      const { title, post } = request.body;

      if (!title || !post) {
        response.status(400).jsonp({
          message: "All fields are required!",
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
      "../../../model/json/posts.resources.json"
    );
  })
  .put((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource =
      require("../../../model/json/posts.resources.json").find((resource) => {
        return resource.id === request.params.id;
      });

    try {
      const { title, post } = request.body;

      if (!title || !post) {
        response.status(400).jsonp({
          message: "All fields are required!",
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
  });

module.exports = router;
