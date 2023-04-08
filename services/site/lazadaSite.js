import Site from './site.js';

class LazadaSite extends Site {
  getOptions() {
    return {
      wait_for: 15000,
      session: 1,
    };
  }

  // convertData() {
  //   const { data } = this;
  //   const result = [];

  //   data.forEach((item) => {
  //     const { title, price, link, image } = item;
  //     result.push({
  //       title,
  //       price,
  //       link,
  //       image,
  //     });
  //   });

  //   return result;
  // }
}

export default LazadaSite;
