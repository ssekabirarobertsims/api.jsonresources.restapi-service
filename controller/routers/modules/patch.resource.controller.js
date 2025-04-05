"use strict";
debugger;
const { format } = require("date-fns");

module.exports = async function (request, response, path) {
  response.contentType = "Application/json";
  response.statusCode = 200;

  try {
    const FoundResource = require(path).find((resource) => {
      return resource.id === request.params.id;
    });

    if (!FoundResource) {
      response.status(404).jsonp({
        message: "No such resource with id was found!",
        error: "Not Found!",
        status: Number.parseInt(404),
        contentType: "Application/json",
        message: "Not Found!",
      });
    } else {
      response.status(200).jsonp({
        data: `Resource with id ${FoundResource.id} has been updated!`,
        date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss"),
        error: undefined,
        status: Number.parseInt(200),
        contentType: "Application/json",
        message: "Ok",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).jsonp({
      message: error.message,
    });
  }
};
