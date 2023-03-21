const http = require("https");
const axios = require('axios');

exports.getListProductByKey = () => {

    const options = {
        "method": "GET",
        "hostname": "ecom.webscrapingapi.com",
        "port": null,
        "path": "/v1?engine=amazon&api_key=61LK5fPcqMRATWjBZWiYLP8t04QcuKd2&type=search&q=memory%20ca",
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