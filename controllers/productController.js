import getListProductByKeyword from '../vendor/scrapeApi.js';

export default function getByKeyWord(req, res, next) {
  try {
    const queryParameter = req.query;
    const { keyword } = queryParameter;

    getListProductByKeyword(keyword).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    next(error);
  }
}
