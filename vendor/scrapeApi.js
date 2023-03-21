const http = require("https");
const config = require("../config/config")

exports.getListProductByKeyword = (keyword) => {
    const options = {
        "method": "GET",
        "hostname": config.vendor.hostVendor,
        "port": null,
        "path": config.vendor.pathSearchByKeyWord + keyword,
        "headers": {}
    };

    return new Promise((resolve, reject) => {
        const request = http.request(options, function (response) {
            const chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
            });

            response.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        request.end();
    });
}