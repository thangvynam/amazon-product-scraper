import {
  getListAmazonProductByKeyword,
  getHtmlAndExtract,
} from '../vendor/scrapeApi.js';
import config from '../config/config.js';

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

      let params = {
        url: link,
        extract_rules: config.extractRule[engine].rule,
      };

      if (engine === 'shopee') {
        params = {
          ...params,
          wait_for_css: '[data-sqe=\'item\']',
        };
      }

      if (engine === 'lazada') {
        params = {
          ...params,
          wait_for: 15000,
          session: 1,
        };
      }

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
