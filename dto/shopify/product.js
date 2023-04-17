class ProductDTO {
  constructor() {
    this.name = '';
    this.type = 'simple';
    this.regular_price = null;
    this.sale_price = null;
    this.virtual = false;
    this.downloadable = false;
    this.downloads = [];
    this.categories = [];
    this.images = [];
  }
}

export default ProductDTO;
