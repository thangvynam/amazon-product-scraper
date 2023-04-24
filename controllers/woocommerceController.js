/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import WoocommerceService from '../services/woocommerceService.js';

const woocommerceService = new WoocommerceService();

export function findProductOnStoreById(req, res, next) {
  try {
    const queryParameter = req.query;
    const { id } = queryParameter;
    const { perPage } = queryParameter;
    return woocommerceService.findProductById(id, perPage).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function getAllProductOnStore(req, res, next) {
  try {
    const queryParameter = req.query;
    const { perPage } = queryParameter;
    return woocommerceService.getAllProducts(perPage).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function createAProductOnStore(req, res, next) {
  try {
    const productData = req.body;
    return woocommerceService.createAProductOnStore(productData).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function createProductsOnStore(req, res, next) {
  try {
    const productData = req.body;
    return woocommerceService.createProductsOnStore(productData).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function createLazadaProductsOnStoreByKeywordSearch(req, res, next) {
  try {
    const { q } = req.query;
    const { page } = req.query;

    if (page == null || page === '') {
      const data = { error: 'Missing page paramter' };
      return res.json(data);
    }
    return woocommerceService.createLazadaProductsOnStoreByKeywordSearch(q, page).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}
