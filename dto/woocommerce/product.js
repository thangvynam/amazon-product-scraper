class ProductDTO {
  constructor() {
    this.name = '';
    this.type = '';
    this.regular_price = 0;
    this.sale_price = 0;
    this.virtual = false;
    this.downloadable = false;
    this.downloads = [];
    this.categories = [];
    this.images = [];
  }
}

export default ProductDTO;
