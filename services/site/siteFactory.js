import LazadaSite from './lazada/lazadaSite.js';
import LazadaSpecificProductSite from './lazada/lazadaSpecificProductSite.js';
import ShopeeSite from './shopee/shopeeSite.js';

class SiteFactory {
  static createSite(site) {
    switch (site) {
      case 'lazada':
        return new LazadaSite();
      case 'lazada_specific_product':
        return new LazadaSpecificProductSite();
      case 'shopee':
        return new ShopeeSite();
      default:
        throw new Error('Site not found');
    }
  }
}

export default SiteFactory;
