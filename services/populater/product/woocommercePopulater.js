/* eslint-disable camelcase */
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
      product.virtual = true;
      product.downloadable = true;
      product.categories = [];
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