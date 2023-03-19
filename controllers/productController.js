const http = require("https");

exports.getByKeyWord = (req, res, next) => {
    try {
        var queryParameter = req.query;
        console.log(queryParameter);
        
        const options = {
            "method": "GET",
            "hostname": "ecom.webscrapingapi.com",
            "port": null,
            "path": "/v1?engine=amazon&api_key=<YOUR_API_KEY>&type=search&q=memory%20ca",
            "headers": {}
        };
        
        const request = http.request(options, function (res) {
        const chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
        });
        
        request.end();
    } catch (error) {
        next(error);
    }
};