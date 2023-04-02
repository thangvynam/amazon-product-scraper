import { getHtmlAndExtract, getListAmazonProductByKeyword } from '../vendor/scrapeApi.js';
import config from '../config/config.js';

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
    const { engine, link } = queryParameter;

    if (config.extractRule[engine] == null) {
      return res.status(400).json({
        ok: false,
        error: 'Bad request with undefined extractRule',
      });
    }

    return getHtmlAndExtract(link, config.extractRule[engine].rule).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    return next(error);
  }
}
