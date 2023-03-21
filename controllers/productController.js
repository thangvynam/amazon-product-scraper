var scrapeApi = require('../vendor/scrapeApi.js');

exports.getByKeyWord = (req, res, next) => {
    try {
        var queryParameter = req.query;
        scrapeApi.getListProductByKey()
            .then(result => {
                res.json({
                    ok: true,
                    data: result
                });
            });
     
    } catch (error) {
        next(error);
    }
};