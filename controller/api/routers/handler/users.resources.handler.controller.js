"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Helper function to get all user resources
function getUserResources() {
  return require("../../../../model/json/users.resources.json");
}

// Helper function to find a user resource by ID
function findUserById(id) {
  return getUserResources().find((resource) => resource.id === id);
}

router
  .route("/users")
  // GET handler for fetching all user resources
  .get((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    try {
      const users = getUserResources();
      // Check if there are any user resources available
      if (request && users.length > 0) {
        response.jsonp({
          data: users,
          error: undefined,
          status: 200,
          category: "users",
          length: users.length,
          contentType: "Application/json",
          root_link: "/resources/users",
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
  // POST handler for adding new user resources (delegated to another module)
  .post(require("../modules/post.users.resources"));

// ****** //
router
  .route("/users/:id")
  // GET handler for fetching a single user resource by ID (delegated to another module)
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../../model/json/users.resources.json"
    );
  })
  // PATCH handler for updating a user resource by ID
  .patch((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the user resource by ID
    const FoundResource = findUserById(request.params.id);

    try {
      const { first_name, last_name, email, job } = request.body;

      // Validate that all required fields are provided
      if (!first_name || !last_name || !email || !job) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: 400,
          contentType: "Application/json",
        });
        return;
      } else if (!validator.isEmail(email)) {
        // Validate email format
        response.status(400).jsonp({
          message: "Please provide a valid email resource!",
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
  // DELETE handler for removing a user resource by ID (delegated to another module)
  .delete((request, response) => {
    require("../modules/delete.resource.controller")(
      request,
      response,
      "../../../../model/json/users.resources.json"
    );
  })
  // PUT handler for updating a user resource by ID (same logic as PATCH)
  .put((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the user resource by ID
    const FoundResource = findUserById(request.params.id);

    try {
      const { first_name, last_name, email, job } = request.body;

      // Validate that all required fields are provided
      if (!first_name || !last_name || !email || !job) {
        response.status(400).jsonp({
          message: "All fields are required!",
          error: "Bad request",
          status: 400,
          contentType: "Application/json",
        });
        return;
      } else if (!validator.isEmail(email)) {
        // Validate email format
        response.status(400).jsonp({
          message: "Please provide a valid email resource!",
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
