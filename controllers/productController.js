import { getHtmlAndExtract, getListAmazonProductByKeyword } from '../vendor/scrapeApi.js';

export function getAmazonDataByKeyWord(req, res, next) {
  try {
    const queryParameter = req.query;
    const { keyword } = queryParameter;

    getListAmazonProductByKeyword(keyword).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    next(error);
  }
}

export function getDataViaLink(req, res, next) {
  try {
    const queryParameter = req.query;
    const { link } = queryParameter;

    getHtmlAndExtract(link).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    next(error);
  }
}
