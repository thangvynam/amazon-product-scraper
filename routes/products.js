/* eslint-disable import/no-cycle */
import { Router } from 'express';

import { getAmazonDataByKeyWord, getDataViaLink } from '../controllers/productController.js';
import { findProductOnStore, creatProductOnStore } from '../controllers/shopify.controller.js';

const router = Router();

router.get('/amazon/', getAmazonDataByKeyWord);
router.get('/', getDataViaLink);
router.get('/shopify/product', findProductOnStore);
router.post('/shopify/product', creatProductOnStore);

export default router;
