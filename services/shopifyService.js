/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import { shopify } from '../app.js';
// import SessionService from './sessionService.js';
import config from '../config/config.js';
import SessionService from './sessionService.js';

class ShopifyService {
  async createProductOnStore(products) {
    try {
      const session = await SessionService.getSessionFromCache(config.shopify.session_secret_key);
      products.products.forEach((product) => {
        const shopifyProduct = new shopify.rest.Product({ session });
        Object.assign(shopifyProduct, product);
        shopifyProduct.save({ update: true });
      });

      return { message: 'products created' };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findProductOnStoreById(productId) {
    try {
      const session = await SessionService.getSessionFromCache(config.shopify.session_secret_key);
      const product = await shopify.rest.Product.find({ session, productId });
      return {
        ok: true,
        data: product,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getAllProductOnStore() {
    try {
      const session = await SessionService.getSessionFromCache(config.shopify.session_secret_key);
      const product = await shopify.rest.Product.all({ session });
      return {
        ok: true,
        data: product,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

export default ShopifyService;
