/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import { shopify } from '../app.js';
// import SessionService from './sessionService.js';
import config from '../config/config.js';
import SessionService from './sessionService.js';

class ShopifyService {
  async createProductOnStore(productData) {
    try {
      // Extract the product data from the input JSON
      const {
        body_html,
        handle,
        images,
        options,
        product_type,
        published_at,
        published_scope,
        status,
        tags,
        template_suffix,
        title,
        variants,
        vendor,
      } = productData.product;
      const session = await SessionService.getSessionFromCache(config.shopify.session_secret_key);
      const product = new shopify.rest.Product({ session });
      // Set the properties of the product object
      product.body_html = body_html;
      product.handle = handle;
      product.images = images;
      product.options = options;
      product.product_type = product_type;
      product.published_at = published_at;
      product.published_scope = published_scope;
      product.status = status;
      product.tags = tags;
      product.template_suffix = template_suffix;
      product.title = title;
      product.variants = variants;
      product.vendor = vendor;
      const res = await product.save({
        update: true,
      });

      return {
        ok: true,
        result: res,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findProductOnStore(productId) {
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
}

export default ShopifyService;
