/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { findProductOnStore, creatProductOnStore } from '../controllers/shopify.controller.js';

const router = Router();

router.get('/product', findProductOnStore);
router.post('/product', creatProductOnStore);

export default router;
