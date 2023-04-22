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

      // const url = `https://lazada.vn/${link}`;
      // const productService = new ProductService();
      // productService.handleDataViaLink(url, 'lazada_specific_product').then((result) => {
      //   console.log(result.data);
      //   product.shipping_fee = result.data.shippingFee;
      //   product.ratingCount = result.data.ratingCount;
      //   product.rating = result.data.rating;
      //   product.discount = result.data.discount;
      //   product.estimated_arrival_date = result.data.estimatedArrivalDate;
      // });
    });

    return products;
  }
}

export default LazadaSite;
