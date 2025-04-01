"use strict"
debugger;
const format = require("date-fns").format;

module.exports = async function (request, response) {
    try {
        const { title, post } = request.body;

        if (!title || !post) {
            response.status(400)
                .jsonp({
                    message: "All fields are required!",
                    error: "Bad request",
                    status: Number.parseInt(400),
                    contentType: "Application/json",
                    message: "Bad request",
                });
            return;
        } else {
            response.status(201)
                .jsonp({
                    message: "Resource has been uploaded!",
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
        response.status(500)
            .jsonp({
                message: error.message
            });
    }
}