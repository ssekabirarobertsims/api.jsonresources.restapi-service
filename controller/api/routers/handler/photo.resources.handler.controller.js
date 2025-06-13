"use strict";
debugger;
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();
const { v4: uuid } = require("uuid");

// Helper function to get the photo resources JSON array
function getPhotoResources() {
  return require("../../../../model/json/photo.resources.json");
}

// Helper function to find a resource by ID
function findResourceById(id) {
  return getPhotoResources().find((resource) => resource.id === id);
}

router
  .route("/photos")
  .get((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    try {
      // Check if there are any photo resources available
      const resources = getPhotoResources();
      if (request && resources.length > 0) {
        response.jsonp({
          data: resources,
          error: undefined,
          status: 200,
          category: "photos",
          length: resources.length,
          contentType: "Application/json",
          root_link: "/resources/photos",
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
  // POST handler for adding new photo resources (delegated to another module)
  .post(require("../modules/post.photos.resources"));

// ****** //
router
  .route("/photos/:id")
  // GET handler for fetching a single resource by ID (delegated to another module)
  .get((request, response) => {
    require("../modules/get.resource.controller")(
      request,
      response,
      "../../../../model/json/photo.resources.json"
    );
  })
  // PATCH handler for updating a photo resource by ID
  .patch((request, response) => {
    response.type("Application/json");
    response.statusCode = 200;

    // Find the resource by ID
    const FoundResource = findResourceById(request.params.id);

    try {
      const { image_url } = request.body;

      // Validate that image_url is provided
      if (!image_url) {
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
      response.status(500).jsonp({
        message: error.message,
        error: "Internal server error",
        status: 500,
        contentType: "Application/json",
      });
    }
  })
  // DELETE handler for removing a photo resource by ID (delegated to another module)
  .delete((request, response) => {
    require("../modules/delete.resource.controller")(
      request,
      response,
      "../../../../model/json/photo.resources.json"
    );
  });

module.exports = router;
