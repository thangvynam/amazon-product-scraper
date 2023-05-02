/* eslint-disable import/no-cycle */
import { Router } from 'express';
// eslint-disable-next-line max-len
import {
  findProductOnStoreById, createAProductOnStore, createProductsOnStore, getAllProductOnStore,
  createLazadaProductsOnStoreByKeywordSearch, exportOrder,
} from '../controllers/woocommerceController.js';

const router = Router();

router.get('/product', findProductOnStoreById);
router.post('/product', createAProductOnStore);
router.post('/products', createProductsOnStore);
router.post('/lazada/products', createLazadaProductsOnStoreByKeywordSearch);
router.get('/product/all', getAllProductOnStore);
router.post('/product/export', exportOrder);

export default router;
