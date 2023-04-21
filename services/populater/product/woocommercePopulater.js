/* eslint-disable camelcase */
import CategoryDTO from '../../../dto/woocommerce/category.js';
import WoocommerceProduct from '../../../dto/woocommerce/product.js';
import Utils from '../../../utils/utils.js';

class WoocommercePopulater {
  map(data) {
    const products = [];
    const array = data.data;
    array.forEach((item) => {
      const {
        id, sku, price, before_discount, images, product_name, shipping_fee, estimated_arrival_date,
      } = item;
      const [fromPrice, toPrice] = price;
      const product = new WoocommerceProduct();
      product.name = product_name;
      product.type = 'simple';
      product.regular_price = parseFloat(fromPrice) * 1000;
      product.sale_price = parseFloat(toPrice) * 1000;
      product.sku = id;
      // product.sku = sku;
      const category = new CategoryDTO();
      category.id = 32; // id of category
      const categories = [];
      categories.push(category);
      product.categories = categories;
      const srcs = [];
      images.forEach((image) => {
        const updatedImage = Utils.removeImageSuffix(image);
        const imageSrc = { src: updatedImage };
        srcs.push(imageSrc);
      });
      product.images = srcs;
      products.push(product);
    });

    return products;
  }
}

export default WoocommercePopulater;
