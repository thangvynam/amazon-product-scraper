/* eslint-disable camelcase */
import Product from '../../../dto/product.js';
import Site from '../site.js';

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
}

export default LazadaSite;
