/* eslint-disable camelcase */
import Product from '../../../dto/product.js';
import Site from '../site.js';
import ProductService from '../../productService.js';

class LazadaSite extends Site {
  getOptions() {
    return {
      wait_for: 15000,
      session: 1,
    };
  }

  // mapProductDetail(products) {
  //   products.forEach((product) => {
  //     const productService = new ProductService();
  //     productService.handleDataViaLink(product.url, 'lazada_specific_product').then((result) => {
  //       console.log(result.data);
  //     });
  //   });
  // }

  map() {
    const { data } = this;
    const products = [];
    // console.log(data);
    const array = JSON.parse(data).products;

    array.forEach((item) => {
      const {
        id, title, price, link, image,
      } = item;
      const customLink = link.substr(2, link.length - 1);

      const product = new Product(id);
      product.product_name = title;
      product.price = [price];
      product.url = customLink;
      product.images = [image];
      products.push(product);
    });

    return products;
  }
}

export default LazadaSite;
