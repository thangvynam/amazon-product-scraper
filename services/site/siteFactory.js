import ShopifySite from './shopifySite.js';
import LazadaSite from './lazadaSite.js';
import ShopeeSite from './shopeeSite.js';
import WoocommerceSite from './woocommerceSite.js';

class SiteFactory {
  static createSite(site) {
    switch (site) {
      case 'lazada':
        return new LazadaSite();
      case 'shopee':
        return new ShopeeSite();
      case 'woocommerce':
        return new WoocommerceSite();
      case 'shopify':
        return new ShopifySite();
      default:
        throw new Error('Site not found');
    }
  }
}

export default SiteFactory;
