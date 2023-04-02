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
    const extractRule = config.extractRule[engine].rule;

    getHtmlAndExtract(link, extractRule).then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  } catch (error) {
    next(error);
  }
}
