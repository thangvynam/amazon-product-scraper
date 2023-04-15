// eslint-disable-next-line import/no-cycle
import WoocommerceService from '../services/woocommerceService.js';

const woocommerceService = new WoocommerceService();

export function findProductOnStoreById(req, res, next) {
  try {
    const queryParameter = req.query;
    const { id } = queryParameter;
    const { perPage } = queryParameter;
    return woocommerceService.findProductOnStoreById(id, perPage).then((result) => {
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
    return woocommerceService.getAllProductOnStore(perPage).then((result) => {
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

export function createLazadaProductsOnStore(req, res, next) {
  try {
    const queryParameter = req.query;
    const { q } = queryParameter;
    return woocommerceService.createLazadaProductsOnStore(q).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}
