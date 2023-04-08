/* eslint-disable class-methods-use-this */
import {
  getListAmazonProductByKeyword,
  getHtmlAndExtract,
} from '../vendor/scrapeApi.js';

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

  async handleDataViaLink(link, rule) {
    try {
      return await getHtmlAndExtract(link, rule);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

export default ProductService;
