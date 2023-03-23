import { Router } from 'express';

import getByKeyWord from '../controllers/productController.js';

const router = Router();

router.get('/', getByKeyWord);

export default router;
