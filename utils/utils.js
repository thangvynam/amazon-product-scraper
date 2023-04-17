const Utils = {
  removeImageSuffix: (imageUrl) => {
    const regex = /_.*\.webp/;
    const match = imageUrl.match(regex);
    return match ? imageUrl.replace(regex, '') : imageUrl;
  },

  buildKeywordSearchURLByHost: (site, hostname, keyword = '') => {
    const urls = {
      lazada: `https://${hostname}/catalog/?q=${keyword}&from=input`,
      shopee: `https://${hostname}/search?keyword=${keyword}`,
    };
    return urls[site] || '';
  },
};

export default Utils;
