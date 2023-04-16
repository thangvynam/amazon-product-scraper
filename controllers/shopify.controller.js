// import ProductService from '../services/productService.js';
// eslint-disable-next-line import/no-cycle
import ShopifyService from '../services/shopifyService.js';

const shopifyService = new ShopifyService();
// const productService = new ProductService();

export function findProductOnStoreById(req, res, next) {
  try {
    const queryParameter = req.query;
    const { productId } = queryParameter;
    return shopifyService.findProductOnStoreById(productId).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function getAllProductOnStore(req, res, next) {
  try {
    return shopifyService.getAllProductOnStore().then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function creatProductOnStore(req, res, next) {
  try {
    // const products = productService.handleGetAmazonDataByKeyWord('keywordSearch');
    const productData = req.body;
    return shopifyService.createProductOnStore(productData).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}
