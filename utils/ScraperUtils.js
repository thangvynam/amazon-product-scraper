/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const extractPath = config.app.extract_data_path;
const ScraperUtils = {

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
    console.log(`${data} has been added to extracted_json_data`);
  },

  saveExportedOrdersToFile: async (site, orderIds) => {
    const orderIdList = orderIds.join(',');
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.exported_orders_list_file_name}`);
    const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
    const flag = fileExists ? 'a' : 'w';
    await fs.promises.writeFile(filePath, `${orderIdList},`, { flag });
    console.log('Already Exported Orders saved');
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
    return ScraperUtils.readValuesFromFile(filePath);
  },

  readExportedOrderIDsFromFile: async (site) => {
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.exported_orders_list_file_name}`);
    return ScraperUtils.readValuesFromFile(filePath);
  },

  readValuesFromFile: async (filePath) => {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return data;
    } catch (error) {
      console.log('Can not read from file or file un-existing');
      return null;
    }
  },

  storeExtractedDataToFile: async (site, data, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const fileName = `${standardizedKeyword}_${page}.json`;
    const filePath = path.join(dirname, `${extractPath}/${site}/json/${fileName}`);
    await fs.promises.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(`JSON Data written to: ${fileName}`);
    });
    // add to extracted list
    await ScraperUtils.addToExtractedList(site, fileName);
  },

  readExtractedDataFromFile: async (site, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const fileName = `${standardizedKeyword}_${page}.json`;
    const filePath = path.join(dirname, `${extractPath}/${site}/json/${fileName}`);
    try {
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      // add to extracted list
      await ScraperUtils.addToExtractedList(site, fileName);
      return JSON.parse(fileData);
    } catch (error) {
      throw new Error(`Can not read from ${filePath}. Error log: ${error}`);
    }
  },

  checkIfDataExtracted: async (site, keyword, page) => {
    const standardizedKeyword = keyword.replace(/\s+/g, '_');
    const filePath = path.join(dirname, `${extractPath}/${site}/json/${standardizedKeyword}_${page}.json`);
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
    const filePath = path.join(dirname, `${extractPath}/${site}/${config.app.extracted_list_file_name}`);
    try {
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      return fileData.includes(fileName);
    } catch (error) {
      console.log(`Data {keyword: ${keyword}, site: ${site}, page: ${page}} have not imported to store yet`);
      return false;
    }
  },

  writeOrderToCSV: async (site, orders) => {
    // Initialize the CSV content with the header row
    const keys = Object.keys(orders[0]);
    let productCsvContent = '';
    let orderCsvContent = '';
    let productByDateCsvContent = '';
    let orderByDateCsvContent = '';
    let addedHeader = false;
    const exportedOrderIDs = [];

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '_');

    const orderFilePath = path.join(dirname, `${extractPath}/${site}/${config.app.order_csv_filename}`);
    const productFilePath = path.join(dirname, `${extractPath}/${site}/${config.app.product_csv_filename}`);
    const orderFileExists = await fs.promises.access(orderFilePath).then(() => true).catch(() => false);
    const productFileExists = await fs.promises.access(productFilePath).then(() => true).catch(() => false);

    const orderFilePathByDate = path.join(dirname, `${extractPath}/${site}/order/${formattedDate}_${config.app.order_csv_by_date_filename}`);
    const productFilePathByDate = path.join(dirname, `${extractPath}/${site}/order/${formattedDate}_${config.app.product_csv_by_date_filename}`);
    const orderFileExistsByDate = await fs.promises.access(orderFilePathByDate).then(() => true).catch(() => false);
    const productFileExistsByDate = await fs.promises.access(productFilePathByDate).then(() => true).catch(() => false);

    const orderFlag = orderFileExists ? 'a' : 'w';
    const productFlag = productFileExists ? 'a' : 'w';
    const orderByDateFlag = orderFileExistsByDate ? 'a' : 'w';
    const productByDateFlag = productFileExistsByDate ? 'a' : 'w';
    const headers = `${keys.join(',')}\n`;

    if (!orderFileExists) {
      orderCsvContent = headers;
    }

    if (orderFileExists && !orderFileExistsByDate) {
      orderByDateCsvContent = headers;
    }

    const alreadyExportedOrderIds = await ScraperUtils.readExportedOrderIDsFromFile(site);
    orders.forEach((row) => {
      let orderId = '';
      keys.forEach((key) => {
        if (!alreadyExportedOrderIds || !alreadyExportedOrderIds.includes(row.id)) {
          if (key === 'id') {
            orderId = row[key];
            if (!exportedOrderIDs.includes(orderId)) {
              exportedOrderIDs.push(orderId);
            }
          }
          // If the value is an array, loop through each item and add it as a separate row
          if (Array.isArray(row[key])) {
            const stringValue = JSON.stringify(row[key]).replace(/,/g, ';');
            orderCsvContent += `"${stringValue}",`;
            // export to order product detail csv
            if (key === config.app.product_export_indicator) {
              row[key].forEach((item) => {
                const itemKeys = Object.keys(item);
                const filteredItemKeys = itemKeys.filter((itemKey) => !config.app.prduct_csv_ignore_header.includes(itemKey));
                const newItemKeys = filteredItemKeys.concat(config.app.product_csv_addtional_column);
                if (addedHeader === false) {
                  if (!productFileExists) {
                    productCsvContent = `order,${newItemKeys.join(',')}\n`;
                  }
                  if (productFileExists && !productFileExistsByDate) {
                    productByDateCsvContent = `order,${newItemKeys.join(',')}\n`;
                  }
                }
                addedHeader = true;
                const itemValues = filteredItemKeys.map((k) => `"${item[k]}"`);
                productCsvContent += `"${orderId}",${itemValues.join(',')}\n`;
              });
            }
          } else {
            orderCsvContent += `"${row[key]}",`;
          }
        }
      });
      if (orderCsvContent && !(orderCsvContent === headers) && !alreadyExportedOrderIds.includes(row.id)) {
        orderCsvContent += '\n';
      }
    });

    if (!orderCsvContent) {
      throw new Error('All order has already been exported.');
    }
    orderByDateCsvContent += orderCsvContent;
    productByDateCsvContent += productCsvContent;

    await Promise.all([
      await fs.promises.writeFile(orderFilePath, orderCsvContent, { flag: orderFlag }),
      await fs.promises.writeFile(orderFilePathByDate, orderByDateCsvContent, { flag: orderByDateFlag }),
      await fs.promises.writeFile(productFilePath, productCsvContent, { flag: productFlag }),
      await fs.promises.writeFile(productFilePathByDate, productByDateCsvContent, { flag: productByDateFlag }),
      ScraperUtils.saveExportedOrdersToFile(site, exportedOrderIDs),

    ]);
    console.log('Order CSV file saved successfully');
    console.log('Product CSV file saved successfully');
    console.log('Exported orders file saved successfully');
  },
};

export default ScraperUtils;
