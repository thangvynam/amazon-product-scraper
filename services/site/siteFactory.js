import LazadaSite from './lazadaSite.js';
import ShopeeSite from './shopeeSite.js';

class SiteFactory {
  static createSite(site) {
    switch (site) {
      case 'lazada':
        return new LazadaSite();
      case 'shopee':
        return new ShopeeSite();
      default:
        throw new Error('Site not found');
    }
  }
}

export default SiteFactory;
