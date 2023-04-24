/* eslint-disable camelcase */
import ShopifyProduct from '../../../dto/shopify/product.js';

class ShopifyPopulater {
  map(data) {
    const products = [];
    const array = data.data;
    array.forEach((item) => {
      const {
        id, sku, price, before_discount, images, product_name, shipping_fee, estimated_arrival_date,
      } = item;
      const [fromPrice, toPrice] = price;
      const product = new ShopifyProduct();
      product.title = product_name;
      product.product_type = '';
      const srcs = [];
      images.forEach((image) => {
        const updatedImage = super.removeSuffix(image);
        const imageSrc = { src: updatedImage };
        srcs.push(imageSrc);
      });
      product.images = srcs;
      products.push(product);
    });

    return products;
  }
}

export default ShopifyPopulater;
