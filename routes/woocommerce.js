/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { findProductOnStoreById, createAProductOnStore, createProductsOnStore, getAllProductOnStore, createLazadaProductsOnStoreByKeywordSearch } from '../controllers/woocommerceController.js';

const router = Router();

router.get('/product', findProductOnStoreById);
router.post('/product', createAProductOnStore);
router.post('/products', createProductsOnStore);
router.post('/lazada/products', createLazadaProductsOnStoreByKeywordSearch);
router.get('/product/all', getAllProductOnStore);

export default router;
