import { getListAmazonProductByKeyword } from '../vendor/scrapeApi.js';

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
}

export default ProductService;
