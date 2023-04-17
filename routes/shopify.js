/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { findProductOnStoreById, creatProductOnStore, getAllProductOnStore } from '../controllers/shopifyController.js';

const router = Router();

router.get('/product', findProductOnStoreById);
router.post('/product', creatProductOnStore);
router.get('/product/all', getAllProductOnStore);

export default router;
