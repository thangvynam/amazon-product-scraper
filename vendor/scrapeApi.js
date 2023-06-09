import { request as _request } from 'https';
import urlQueryString from 'querystring';
import config from '../config/config.js';

export function getListAmazonProductByKeyword(keyword) {
  const options = {
    method: 'GET',
    hostname: config.vendor.hostVendor,
    port: null,
    path: config.vendor.pathSearchByKeyWord + keyword,
    headers: {},
  };

  return new Promise((resolve) => {
    const request = _request(options, (response) => {
      const chunks = [];

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    request.end();
  });
}

export async function getHtmlAndExtract(params) {
  const queryString = {
    ...params,
    api_key: config.vendor.apiKeyAbstract,
    device: 'desktop',
    proxy_type: 'datacenter',
    render_js: 1,
    wait_until: 'domcontentloaded',
    timeout: 50000,
  };

  const options = {
    hostname: config.vendor.hostHighLevelVendor,
    port: null,
    method: 'GET',
    path: `/v1?${urlQueryString.stringify(queryString)}`,
    headers: {},
  };

  return new Promise((resolve) => {
    const request = _request(options, (response) => {
      const chunks = [];

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    request.end();
  });
}
