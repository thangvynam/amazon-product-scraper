/* eslint-disable camelcase */
import ShopifyProduct from '../../dto/shopify/product.js';
import Site from './site.js';

class ShopifySite extends Site {
  map(data) {
    const products = [];
    const array = data.data;
    array.forEach((item) => {
      const {
        id, sku, price, before_discount, images, product_name, shipping_fee, estimated_arrival_date,
      } = item;
      const [fromPrice, toPrice] = price;
      const product = new ShopifyProduct();
      product.name = product_name;
      product.type = 'simple';
      product.regular_price = fromPrice;
      product.sale_price = toPrice;
      product.virtual = true;
      product.downloadable = true;
      product.categories = [];
      const srcs = [];
      images.forEach((image) => {
        const updatedImage = super.removeSuffix(image);
        const imageSrc = { src: updatedImage };
        srcs.push(imageSrc);
        srcs.push(imageSrc);
      });
      product.images = srcs;

      products.push(product);
    });

    return products;
  }
}

export default ShopifySite;
