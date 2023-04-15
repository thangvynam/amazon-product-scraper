/* eslint-disable import/no-cycle */
import { Router } from 'express';

import { getAmazonDataByKeyWord, getDataViaLink } from '../controllers/productController.js';

const router = Router();

router.get('/amazon/', getAmazonDataByKeyWord);
router.get('/', getDataViaLink);

export default router;
