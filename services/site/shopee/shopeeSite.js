import Product from '../../../dto/product.js';
import Site from '../site.js';

class ShopeeSite extends Site {
  getOptions() {
    return {
      wait_for_css: "[data-sqe='item']",
    };
  }

  map() {
    try {
      const { data } = this;
      const products = [];
      const object = JSON.parse(data);

      if (object.status != null) {
        return [];
      }

      object.products.forEach((item) => {
        const {
          name, fromPrice, toPrice, link, image,
        } = item;

        const product = new Product(link);
        product.product_name = name;
        product.price = [fromPrice, toPrice];
        product.url = link;
        product.images = [image];
        products.push(product);
      });

      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default ShopeeSite;
