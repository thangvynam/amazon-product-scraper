import config from '../config/config.js';
import ProductService from '../services/productService.js';

const productService = new ProductService();

export function getAmazonDataByKeyWord(req, res, next) {
  try {
    const queryParameter = req.query;
    const { keyword } = queryParameter;
    productService.handleGetAmazonDataByKeyWord(keyword).then((result) => {
      res.json(result);
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

    productService
      .handleDataViaLink(link, config.extractRule[engine].rule)
      .then((result) => {
        res.json({
          ok: true,
          data: result,
        });
      });
  } catch (error) {
    return next(error);
  }
}
