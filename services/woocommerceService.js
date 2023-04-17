// eslint-disable-next-line import/no-cycle
import { woocommerceClient } from '../app.js';
import ProductService from './productService.js';
import Populater from './populater/product/populater.js';
import Utils from '../utils/utils.js';

class WooCommerceService {
  async createAProductOnStore(product) {
    try {
      const response = await woocommerceClient.post('products/', product);

      return {
        ok: true,
        message: 'Product created',
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create product',
        error: error.response.data,
      };
    }
  }

  async createProductsOnStore(product) {
    try {
      const response = await woocommerceClient.post('products/batch', product);

      return {
        ok: true,
        message: 'Products created',
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create multiple products',
        error: error.response.data,
      };
    }
  }

  async findProductById(productId, perPage) {
    try {
      const response = await woocommerceClient.get(`products/${productId}`, {
        per_page: perPage,
      });

      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.response.data,
      };
    }
  }

  async getAllProducts(perPage) {
    try {
      const response = await woocommerceClient.get('products', {
        per_page: perPage,
      });

      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.response.data,
      };
    }
  }

  async createLazadaProductsOnStoreByKeywordSearch(keyword) {
    try {
      const productService = new ProductService();
      const site = 'lazada';
      const url = Utils.buildKeywordSearchURLByHost(site, `www.${site}.vn`, keyword);
      if (url === '') {
        throw new Error('url searching by keyword is empty');
      }
      console.log(`scraping product data from : ${url}`);
      const populater = Populater.getPopulater('woocommerce');
      const lazadaProducts = await productService.handleDataViaLink(url, site);
      const products = populater.map(lazadaProducts);
      const inputProducts = {
        create: products,
      };

      const response = await woocommerceClient.post('products/batch', inputProducts);

      return {
        ok: true,
        message: 'Lazada Products created',
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create Lazada products',
        error: error.response.data,
      };
    }
  }
}

export default WooCommerceService;
