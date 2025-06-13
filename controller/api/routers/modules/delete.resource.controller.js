"use strict";
debugger;
const { format } = require("date-fns");

// Controller to handle deletion of a resource by ID from a JSON file
module.exports = async function (request, response, path) {
  response.type("Application/json"); // Set response type to JSON
  response.statusCode = 200; // Default status code

  try {
    // Attempt to find the resource by ID in the provided JSON file
    const FoundResource = require(path).find((resource) => {
      return resource.id === request.params.id;
    });

    // If resource is not found, return a 404 response
    if (!FoundResource) {
      return response.status(404).jsonp({
        message: "No such resource with id was found!",
        error: "Not Found!",
        status: 404,
        contentType: "Application/json",
        message: "Not Found!",
      });
    }

    // Resource found (actual deletion logic not implemented)
    return response.status(200).jsonp({
      data: `Resource with id ${FoundResource.id} has been deleted!`,
      date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
      error: undefined,
      status: 200,
      contentType: "Application/json",
      message: "Ok",
    });
  } catch (error) {
    // Handle unexpected errors and return a 500 response
    console.log(error.message);
    return response.status(500).jsonp({
      message: "Internal server error",
      error: error.message,
      status: 500,
      now: format(new Date(), "dd/mm/yyyy\tHH:mm:ss"),
      request_id: uuid(),
    });
  }
};
