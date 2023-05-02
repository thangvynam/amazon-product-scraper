/* eslint-disable camelcase */
import CategoryDTO from '../../../dto/woocommerce/category.js';
import WoocommerceProduct from '../../../dto/woocommerce/product.js';
import ScraperUtils from '../../../utils/ScraperUtils.js';

class WoocommercePopulater {
  map(data) {
    const products = [];
    const array = data.data;
    array.forEach((item) => {
      const {
        id, sku, price, before_discount, images, product_name, shipping_fee, estimated_arrival_date,
      } = item;
      const [fromPrice, toPrice] = price;
      // not import product which does not have id
      if (id) {
        const product = new WoocommerceProduct();
        product.name = product_name;
        product.type = 'simple';
        product.regular_price = parseFloat(fromPrice) * 1000; // TODO: Apply our price
        product.sale_price = parseFloat(fromPrice) * 1000; // TODO: Apply our price
        product.sku = id;
        // product.sku = sku;
        const category = new CategoryDTO();
        category.id = 32; // id of category. TODO:// define category in store for importing products.
        const categories = [];
        categories.push(category);
        product.categories = categories;
        const srcs = [];
        images.forEach((image) => {
          // TODO: decode base64 of lazada img source
          const updatedImage = ScraperUtils.removeImageSuffix(image);
          const imageSrc = { src: updatedImage };
          srcs.push(imageSrc);
        });
        product.images = srcs;
        products.push(product);
      } else {
        console.log(`${JSON.stringify(item)} has empty id`);
      }
    });

    return products;
  }
}

export default WoocommercePopulater;
