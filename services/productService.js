import {
  getListAmazonProductByKeyword,
  getHtmlAndExtract,
} from '../vendor/scrapeApi.js';
import config from '../config/config.js';
import SiteFactory from './site/siteFactory.js';

class ProductService {
  async handleGetAmazonDataByKeyWord(keyword) {
    try {
      const result = await getListAmazonProductByKeyword(keyword);
      return {
        ok: true,
        data: result,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async handleDataViaLink(link, engine) {
    try {
      if (config.extractRule[engine] == null) {
        return {
          ok: false,
          error: 'Bad request with undefined extractRule',
        };
      }

      const site = SiteFactory.createSite(engine);
      const option = site.getOptions();

      const params = {
        url: link,
        extract_rules: config.extractRule[engine].rule,
        ...option,
      };

      const result = await getHtmlAndExtract(params);
      return {
        ok: true,
        data: result,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

export default ProductService;
