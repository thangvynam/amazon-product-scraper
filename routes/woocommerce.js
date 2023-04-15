/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { findProductOnStoreById, createAProductOnStore, createProductsOnStore, getAllProductOnStore, createLazadaProductsOnStore } from '../controllers/woocommerce.controller.js';

const router = Router();

router.get('/product', findProductOnStoreById);
router.post('/product', createAProductOnStore);
router.post('/products', createProductsOnStore);
router.post('/lazada/products', createLazadaProductsOnStore);
router.get('/product/all', getAllProductOnStore);

export default router;
