"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Helper function to get all text resources
function getTextResources() {
  return require("../../../../model/json/texts.resources.json");
}

// Helper function to find a text resource by ID
function findTextById(id) {
  return getTextResources().find((resource) => resource.id === id);
}

router
  .route("/texts")
  // GET handler for fetching all text resources
  .get((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    try {
      const texts = getTextResources();
      // Check if there are any text resources available
      if (request && texts.length > 0) {
        response.jsonp({
          data: texts,
          error: undefined,
          status: 200,
          category: "texts",
          length: texts.length,
          contentType: "Application/json",
          root_link: "/resources/texts",
          message: "Ok",
          now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
          request_id: uuid(),
        });
      } else {
        // No resources found, do nothing (could be improved to return a message)
        (async function () {
          return;
        })();
      }
    } catch (error) {
      // Handle unexpected errors
      console.log(error.message);
      return response.status(500).jsonp({
        message: "Internal server error",
        error: error.message,
        status: 500,
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        request_id: uuid(),
      });
    }
  })
  // POST handler for adding new text resources (delegated to another module)
  .post(require("../modules/post.texts.resources"));

// ****** //
router
  .route("/texts/:id")
  // GET handler for fetching a single text resource by ID (delegated to another module)
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../../model/json/texts.resources.json"
    );
  })
  // PATCH handler for updating a text resource by ID
  .patch((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the resource by ID
    const FoundResource = findTextById(request.params.id);

    try {
      const { text } = request.body;

      // Validate that text is provided
      if (!text) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: 400,
          contentType: "Application/json",
        });
        return;
      } else if (!FoundResource) {
        // Resource not found
        response.status(404).jsonp({
          message: "No such resource with id was found!",
          error: "Not Found!",
          status: 404,
          contentType: "Application/json",
        });
      } else {
        // Resource found and input valid, respond with success (actual update logic missing)
        response.statusCode = 201;
        response.status(201).jsonp({
          data: `Resource with id ${FoundResource.id} has been updated!`,
          error: undefined,
          status: 200,
          contentType: "Application/json",
          message: "Created",
          now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        });
        return;
      }
    } catch (error) {
      // Handle unexpected errors
      console.log(error.message);
      return response.status(500).jsonp({
        message: "Internal server error",
        error: error.message,
        status: 500,
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        request_id: uuid(),
      });
    }
  })
  // DELETE handler for removing a text resource by ID (delegated to another module)
  .delete((request, response) => {
    require("../modules/delete.resource.controller")(
      request,
      response,
      "../../../../model/json/texts.resources.json"
    );
  })
  // PUT handler for updating a text resource by ID (same logic as PATCH)
  .put((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the resource by ID
    const FoundResource = findTextById(request.params.id);

    try {
      const { text } = request.body;

      // Validate that text is provided
      if (!text) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: 400,
          contentType: "Application/json",
        });
        return;
      } else if (!FoundResource) {
        // Resource not found
        response.status(404).jsonp({
          message: "No such resource with id was found!",
          error: "Not Found!",
          status: 404,
          contentType: "Application/json",
        });
      } else {
        // Resource found and input valid, respond with success (actual update logic missing)
        response.statusCode = 201;
        response.status(201).jsonp({
          data: `Resource with id ${FoundResource.id} has been updated!`,
          error: undefined,
          status: 200,
          contentType: "Application/json",
          message: "Created",
          now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        });
        return;
      }
    } catch (error) {
      // Handle unexpected errors
      console.log(error.message);
      return response.status(500).jsonp({
        message: "Internal server error",
        error: error.message,
        status: 500,
        now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
        request_id: uuid(),
      });
    }
  });

module.exports = router;
