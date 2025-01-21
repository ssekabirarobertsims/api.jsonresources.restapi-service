"use strict";
const express = require("express");
const { format } = require("date-fns");
const validator = require("validator");
const router = express.Router();

router.route("/texts").get((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    try {
        request ? response
            .jsonp({
                data: require("../../../model/json/texts.resources.json"),
                message: "",
                category: "",
                length: Number.parseInt(0),
                contentType: "Application/json",
                root_link: "/resources/texts"
            })
            : (async function () {
                return
            }());
    } catch (error) {
        console.log(error.message);
        response.status(500)
            .jsonp({
                message: error.message
            });
    }
}).post(require("../modules/post.texts.resources"));

// ****** //
router.route("/texts/:id").get((request, response) => {
    require("../modules/get.resource.controller")(request, response, "../../../model/json/texts.resources.json")
}).patch((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource = require("../../../model/json/texts.resources.json").find((resource) => {
        return resource.id === request.params.id;
    });

    try {
        const { text } = request.body;

        if (!text) {
            response.status(400)
                .jsonp({
                    message: "All fields are required!"
                });
            return;
        } else if (!FoundResource) {
            response.status(404)
                .jsonp({
                    message: "No such resource with id was found!"
                });
        } else {
            response.statusCode = 201;
            response.status(201)
                .jsonp({
                    data: `Resource with id ${FoundResource.id} has been updated!`,
                    date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss")
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
}).delete((request, response) => {
    require("../modules/delete.resource.controller")(request, response, "../../../model/json/texts.resources.json")
}).put((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = 200;

    const FoundResource = require("../../../model/json/texts.resources.json").find((resource) => {
        return resource.id === request.params.id;
    });

    try {
        const { text } = request.body;

        if (!text) {
            response.status(400)
                .jsonp({
                    message: "All fields are required!"
                });
            return;
        } else if (!FoundResource) {
            response.status(404)
                .jsonp({
                    message: "No such resource with id was found!"
                });
        } else {
            response.statusCode = 201;
            response.status(201)
                .jsonp({
                    data: `Resource with id ${FoundResource.id} has been updated!`,
                    date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss")
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
});

module.exports = router;