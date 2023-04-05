// import ProductService from '../services/productService.js';
import ShopifyService from '../services/shopifyService.js';

const shopifyService = new ShopifyService();
// const productService = new ProductService();
const // hard code product list JSON data to test
  products = {
    products: [
      {
        id: 1,
        product_name: 'Product 1',
        sku: 'SKU001',
        price: 10.99,
        url: 'https://www.example.com/product1',
        before_discount: 12.99,
        images: [
          {
            url1: 'https://www.example.com/product1/image1.jpg',
            url2: 'https://www.example.com/product1/image2.jpg',
          },
          {
            url1: 'https://www.example.com/product1/image3.jpg',
            url2: 'https://www.example.com/product1/image4.jpg',
          },
        ],
        shipping_fee: 2.99,
        estimated_arrival_date: '2023-04-12',
      },
      {
        id: 2,
        product_name: 'Product 2',
        sku: 'SKU002',
        price: 19.99,
        url: 'https://www.example.com/product2',
        before_discount: 24.99,
        images: [
          {
            url1: 'https://www.example.com/product2/image1.jpg',
            url2: 'https://www.example.com/product2/image2.jpg',
          },
          {
            url1: 'https://www.example.com/product2/image3.jpg',
            url2: 'https://www.example.com/product2/image4.jpg',
          },
        ],
        shipping_fee: 3.99,
        estimated_arrival_date: '2023-04-15',
      },
      {
        id: 3,
        product_name: 'Product 3',
        sku: 'SKU003',
        price: 7.99,
        url: 'https://www.example.com/product3',
        before_discount: 9.99,
        images: [
          {
            url1: 'https://www.example.com/product3/image1.jpg',
            url2: 'https://www.example.com/product3/image2.jpg',
          },
          {
            url1: 'https://www.example.com/product3/image3.jpg',
            url2: 'https://www.example.com/product3/image4.jpg',
          },
        ],
        shipping_fee: 1.99,
        estimated_arrival_date: '2023-04-10',
      },
    ],
  };

export function findProductOnStore(req, res, next) {
  try {
    const queryParameter = req.query;
    const { id } = queryParameter;
    return shopifyService.findProductOnStore(id).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

export function creatProductOnStore(req, res, next) {
  try {
    // const products = productService.handleGetAmazonDataByKeyWord('keywordSearch');
    return shopifyService.createProductOnStore(req, res, products).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}
