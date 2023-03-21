var scrapeApi = require('../vendor/scrapeApi.js');

exports.getByKeyWord = (req, res, next) => {
    try {
        var queryParameter = req.query;
        const keyword = queryParameter.keyword;

        scrapeApi.getListProductByKeyword(keyword)
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