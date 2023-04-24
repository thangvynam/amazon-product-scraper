import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const extractPath = config.app.extract_data_path;
const Utils = {

  removeImageSuffix: (imageUrl) => {
    const regex = /_.*\.webp/;
    const match = imageUrl.match(regex);
    return match ? imageUrl.replace(regex, '') : imageUrl;
  },

  buildKeywordSearchURLByHost: (site, hostname, keyword = '', page = '1') => {
    const urls = {
      lazada: `https://${hostname}/catalog/?q=${keyword}&from=input&page=${page}`,
      shopee: `https://${hostname}/search?keyword=${keyword}&page=${page}`,
    };
    return urls[site] || '';
  },

  buildAllProductSearchURLBySupplier: (site, hostname, supplier, keyword = '', page = '1') => {
    const urls = {
      lazada: `https://${hostname}/${supplier}/?q=All-Products&from=wangpu`,
      shopee: `https://${hostname}/search?keyword=${keyword}&page=${page}`,
    };
    return urls[site] || '';
  },

  addToExtractedList: async (site, data) => {
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.extracted_list_file_name}`);
    const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
    const flag = fileExists ? 'a' : 'w';
    await fs.promises.writeFile(filePath, `${data},`, { flag });
    console.log(`Data written to: ${data}`);
  },

  saveImportedSkuProductToFile: async (site, products) => {
    const skuList = products.map((product) => product.sku).join(',');
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.extracted_sku_list_file_name}`);
    const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
    const flag = fileExists ? 'a' : 'w';
    await fs.promises.writeFile(filePath, `${skuList},`, { flag });
    console.log('Imported sku saved');
  },

  readImportedSkuFromFile: async (site) => {
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.extracted_sku_list_file_name}`);
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return data;
    } catch (error) {
      throw new Error(`Can not read from ${filePath}. Error log: ${error}`);
    }
  },

  storeExtractedDataToFile: async (site, data, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const fileName = `${standardizedKeyword}_${page}.json`;
    const filePath = path.join(dirname, `${extractPath}/${site}/${fileName}`);
    await fs.promises.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(`Data written to: ${fileName}`);
    });
    // add to extracted list
    await Utils.addToExtractedList(site, fileName);
  },

  readExtractedDataFromFile: async (site, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const fileName = `${standardizedKeyword}_${page}.json`;
    const filePath = path.join(dirname, `${extractPath}/${site}/${fileName}`);
    try {
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      // add to extracted list
      await Utils.addToExtractedList(site, fileName);
      return JSON.parse(fileData);
    } catch (error) {
      throw new Error(`Can not read from ${filePath}. Error log: ${error}`);
    }
  },

  checkIfDataExtracted: async (site, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const filePath = path.join(dirname, `${extractPath}/${site}/${standardizedKeyword}_${page}.json`);
    try {
      if (fs.existsSync(filePath)) {
        console.log(`{site: ${site}, keyword: ${keyword}, page: ${page}} data existed`);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  checkDataAlreadyImportedToStore: async (site, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const fileName = `${standardizedKeyword}_${page}.json`;
    const filePath = path.join(dirname, `data/product/${site}/${config.app.extracted_list_file_name}`);
    try {
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      return fileData.includes(fileName);
    } catch (error) {
      console.log('Data have not imported');
      return false;
    }
  },
};

export default Utils;
