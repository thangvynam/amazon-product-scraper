/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import { woocommerceClient } from '../app.js';
import ProductService from './productService.js';
import Populater from './populater/product/populater.js';
import Utils from '../utils/utils.js';

class WooCommerceService {
  async createAProductOnStore(product) {
    try {
      const response = await woocommerceClient.post('products/', product);

      return {
        ok: true,
        message: 'Product created',
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create product',
        error: error.response.data,
      };
    }
  }

  async createProductsOnStore(product) {
    try {
      const response = await woocommerceClient.post('products/batch', product);

      return {
        ok: true,
        message: 'Products created',
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create multiple products',
        error: error.response.data,
      };
    }
  }

  async findProductById(productId, perPage) {
    try {
      const response = await woocommerceClient.get(`products/${productId}`, {
        per_page: perPage,
      });

      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.response.data,
      };
    }
  }

  async getAllProducts(perPage) {
    try {
      const response = await woocommerceClient.get('products', {
        per_page: perPage,
      });

      return {
        ok: true,
        data: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.response.data,
      };
    }
  }

  async createLazadaProductsOnStoreByKeywordSearch(keyword, page) {
    try {
      const site = 'lazada';
      const isDataAlreadyImported = await Utils.checkDataAlreadyImportedToStore(site, keyword, page);
      if (!isDataAlreadyImported) {
        let lazadaProducts = {};
        const isDataExtracted = await Utils.checkIfDataExtracted(site, keyword, page);
        if (!isDataExtracted) {
          const productService = new ProductService();
          const url = Utils.buildKeywordSearchURLByHost(site, `www.${site}.vn`, keyword, page);
          if (!url) {
            throw new Error('url searching by keyword is empty');
          }
          console.log(`scraping product data from live server : ${url}`);
          lazadaProducts = await productService.handleDataViaLink(url, site);
          await Utils.storeExtractedDataToFile(site, lazadaProducts, keyword, page);
        } else {
          lazadaProducts = await Utils.readExtractedDataFromFile(site, keyword, page);
        }
        const populater = Populater.getPopulater('woocommerce');
        const products = populater.map(lazadaProducts);
        // filter out already imported product on site by sku number
        const skuList = await Utils.readImportedSkuFromFile(site);
        const filteredProducts = products.filter((product) => !skuList.includes(product.sku));
        if (filteredProducts.length === 0) {
          throw new Error('Filtered all duplicated products. No need to import again');
        }
        const inputProducts = {
          create: filteredProducts,
        };
        const response = await woocommerceClient.post('products/batch', inputProducts);
        // save to imported sku product
        await Utils.saveImportedSkuProductToFile(site, products);
        return {
          ok: true,
          message: `${products.length} Lazada Products created`,
          data: response.data,
        };
      }
      throw new Error(`data for {keyword: ${keyword}, page: ${page}} has already imported before`);
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to create Lazada products',
        error: error.message,
      };
    }
  }
}

export default WooCommerceService;
