"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Helper function to get all post resources
function getPostResources() {
  return require("../../../../model/json/posts.resources.json");
}

// Helper function to find a post resource by ID
function findPostById(id) {
  return getPostResources().find((resource) => resource.id === id);
}

router
  .route("/posts")
  // GET handler for fetching all post resources
  .get((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    try {
      const posts = getPostResources();
      // Check if there are any post resources available
      if (request && posts.length > 0) {
        response.jsonp({
          data: posts,
          error: undefined,
          status: 200,
          category: "posts",
          length: posts.length,
          contentType: "Application/json",
          root_link: "/resources/posts",
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
  // POST handler for adding new post resources (delegated to another module)
  .post(require("../modules/posts.posts.resources"));

// ****** //
router
  .route("/posts/:id")
  // GET handler for fetching a single post resource by ID (delegated to another module)
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../../model/json/posts.resources.json"
    );
  })
  // PATCH handler for updating a post resource by ID
  .patch((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the resource by ID
    const FoundResource = findPostById(request.params.id);

    try {
      const { title, post } = request.body;

      // Validate that both title and post are provided
      if (!title || !post) {
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
  // DELETE handler for removing a post resource by ID (delegated to another module)
  .delete((request, response) => {
    require("../modules/delete.resource.controller")(
      request,
      response,
      "../../../../model/json/posts.resources.json"
    );
  })
  // PUT handler for updating a post resource by ID (same logic as PATCH)
  .put((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the resource by ID
    const FoundResource = findPostById(request.params.id);

    try {
      const { title, post } = request.body;

      // Validate that both title and post are provided
      if (!title || !post) {
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
