import ProductService from '../services/productService.js';

const productService = new ProductService();

export function getAmazonDataByKeyWord(req, res, next) {
  try {
    const queryParameter = req.query;
    const { keyword } = queryParameter;
    return productService
      .handleGetAmazonDataByKeyWord(keyword)
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    return next(error);
  }
}

export function getSpecificProduct(req, res, next) {
  try {
    const queryParameter = req.query;
    const { engine, link } = queryParameter;

    return productService.handleDataViaLink(link, engine).then((result) => {
      res.json(result);
    });
  } catch (error) {
    return next(error);
  }
}

// const asyncFunc = async (link, engine) => {
//   // Perform some asynchronous operation using the input parameter
//   const result = await productService.handleDataViaLink(link, engine);
//   return result;
// };

export function getDataViaLink(req, res, next) {
  try {
    const queryParameter = req.query;
    const { engine, link } = queryParameter;

    return (
      productService
        .handleDataViaLink(link, engine)
        // .then((result) => {
        //   const products = result.data;
        //   products.slice(1, 3 + 1); // test
        //   Promise.all(products.map(async (product) => {
        //     const { url } = product;
        //     const customLink = encodeURIComponent(`https://${url}`);
        //     const detail = await asyncFunc(customLink, 'lazada_specific_product');
        //     product.shipping_fee = detail.data.shippingFee;
        //     product.ratingCount = detail.data.ratingCount;
        //     product.rating = detail.data.rating;
        //     product.discount = detail.data.discount;
        //     product.estimated_arrival_date = detail.data.estimatedArrivalDate;

        //     return product;
        //   }))
        //     .then((combineResult) => {
        //       console.log(combineResult);
        //       res.json(combineResult);
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
        // })
        .then((result) => {
          res.json(result);
        })
        .catch((error) => console.error(error))
    );
  } catch (error) {
    return next(error);
  }
}
