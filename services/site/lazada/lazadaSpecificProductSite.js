/* eslint-disable camelcase */
import ProductDetailDTO from '../../../dto/productDetail.js';
import Site from '../site.js';

class LazadaSpecificProductSite extends Site {
  getOptions() {
    return {
      wait_for: 15000,
      // session: 1,
      timeout: 15000,
    };
  }

  map() {
    const { data } = this;
    const product = JSON.parse(data);

    const dto = new ProductDetailDTO();
    dto.shippingFee = product.shippingFee;
    dto.ratingCount = product.ratingCount;
    dto.variantImage = product.variantImage;
    dto.rating = product.rating;
    dto.discount = product.discount;
    dto.estimatedArrivalDate = product.estimatedArrivalDate;

    return dto;
  }
}

export default LazadaSpecificProductSite;
