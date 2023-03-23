const scrapeApi = require('../vendor/scrapeApi');

exports.getByKeyWord = (req, res, next) => {
  try {
    const queryParameter = req.query;
    const { keyword } = queryParameter;

    scrapeApi.getListProductByKeyword(keyword).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    next(error);
  }
};
