"use strict";

module.exports = async function (request, response) {
    try {
        const { title, post } = request.body;

        if (!title || !post) {
            response.status(400)
                .jsonp({
                    message: "All fields are required!"
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