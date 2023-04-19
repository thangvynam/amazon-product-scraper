/* eslint-disable import/no-cycle */
import { Router } from 'express';

import { getAmazonDataByKeyWord, getDataViaLink, getSpecificProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', getDataViaLink);
router.get('/amazon/', getAmazonDataByKeyWord);
router.get('/specification/', getSpecificProduct);

export default router;
