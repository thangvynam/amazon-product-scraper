// eslint-disable-next-line import/no-cycle
import { woocommerceClient } from '../app.js';
import ProductService from './productService.js';
import SiteFactory from './site/siteFactory.js';

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
      const link = `https://www.lazada.vn/catalog/?q=${keyword}&from=input`;
      const site = SiteFactory.createSite('woocommerce');
      const lazadaProducts = await productService.handleDataViaLink(link, 'lazada');
      const products = site.map(lazadaProducts);
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
