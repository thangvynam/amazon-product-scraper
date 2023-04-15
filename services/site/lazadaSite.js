/* eslint-disable camelcase */
import Product from '../../dto/woocommerce/product.js';
import Site from './site.js';

class LazadaSite extends Site {
  getOptions() {
    return {
      wait_for: 15000,
      session: 1,
    };
  }

  map() {
    const { data } = this;
    const products = [];
    const array = JSON.parse(data).products;
    array.forEach((item) => {
      const {
        id, title, price, link, image,
      } = item;

      const product = new Product(id);
      product.product_name = title;
      product.price = [price];
      product.url = link;
      product.images = [image];
      products.push(product);
    });

    return products;
  }

  mapToWooCommerceProducts(data) {
    const products = [];
    const array = JSON.parse(data).data;
    array.forEach((item) => {
      const {
        id, sku, price, before_discount, images, product_name, shipping_fee, estimated_arrival_date,
      } = item;

      const product = new Product();
      product.name = product_name;
      product.type = '';
      product.regular_price = price;
      product.sale_price = before_discount;
      product.virtual = true;
      product.downloadable = true;
      product.categories = [];
      product.price = [price];
      product.images = [images];

      products.push(product);
    });

    return products;
  }
}

export default LazadaSite;
