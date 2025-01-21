const { format } = require("date-fns");

module.exports = async function (request, response, path) {
    response.contentType = "Application/json";
    response.statusCode = 200;

    try {
        const FoundResource = require(path).find((resource) => {
            return resource.id === request.params.id;
        });

        if (!FoundResource) {
            response.status(404)
                .jsonp({
                    message: "No such resource with id was found!"
                });
        } else {
            response.status(200)
                .jsonp({
                    data: `Resource with id ${FoundResource.id} has been updated!`,
                    date: format(new Date(), "dd/MM/yyyy\tHH:mm:ss")
                });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500)
            .jsonp({
                message: error.message
            });
    }
}