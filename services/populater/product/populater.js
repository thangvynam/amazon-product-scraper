import ShopifyPopulater from './shopifyPopulater.js';
import WoocommercePopulater from './woocommercePopulater.js';

class Populater {
  static getPopulater(site) {
    switch (site) {
      case 'woocommerce':
        return new WoocommercePopulater();
      case 'shopify':
        return new ShopifyPopulater();
      default:
        throw new Error('Populater not found');
    }
  }
}

export default Populater;
