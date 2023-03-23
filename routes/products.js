const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getByKeyWord);

module.exports = router;
