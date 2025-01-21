"use strict";
const validator = require("validator");

module.exports = async function (request, response) {
    try {
        const { first_name, last_name, email, job } = request.body;

        if (!first_name || !last_name || !email || !job) {
            response.status(400)
                .jsonp({
                    message: "All fields are required!"
                });
            return;
        } else if (!validator.isEmail(email)) {
            response.status(201)
                .jsonp({
                    message: "Please a valid email resource!"
                });
            return;
        } else {
            response.status(201)
                .jsonp({
                    message: "Resource has been uploaded!"
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