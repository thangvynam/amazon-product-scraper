import IDTO from './iDTO.js';

class ProductDTO extends IDTO {
  constructor(id) {
    super(id);

    this.sku = '';
    this.price = null;
    this.url = '';
    this.before_discount = '';
    this.images = [];
    this.product_name = '';
    this.shipping_fee = null;
    this.estimated_arrival_date = '';
  }
}

export default ProductDTO;
