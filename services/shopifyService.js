// eslint-disable-next-line import/no-cycle
import { shopify } from '../app.js';

const sessionStore = {}; // define an in-memory session store
class ShopifyService {
  async createProductOnStore(req, res, products) {
    try {
      const sessionId = await shopify.session.getCurrentId({
        rawRequest: req,
        rawResponse: res,
      });

      // use sessionId to retrieve session from app's session storage
      // getSessionFromStorage() must be provided by application
      const session = await this.getSessionFromStorage(sessionId);

      // get a single product via its product id
      const product = await shopify.rest.Product.find({ session, id: '8106779214120' });
      console.log(product);
      // product.title = 'A new title';

      // await product.save({
      //   update: true,
      // });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findProductOnStore(req, res, id) {
    try {
      const sessionId = await shopify.session.getCurrentId({
        rawRequest: req,
        rawResponse: res,
      });
      // use sessionId to retrieve session from app's session storage
      // getSessionFromStorage() must be provided by application
      const session = await this.getSessionFromStorage(sessionId);

      // get a single product via its product id
      const product = await shopify.rest.Product.find({ session, id });
      console.log(product);
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

  async getSessionFromStorage(sessionId) {
    return new Promise((resolve, reject) => {
      const session = sessionStore[sessionId];
      if (session) {
        resolve(session);
      } else {
        reject(new Error('Session not found'));
      }
    });
  }
}

export default ShopifyService;
