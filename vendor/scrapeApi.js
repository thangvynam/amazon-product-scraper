import { request as _request } from 'https';
import webScrapingApiClient from 'webscrapingapi';

import config from '../config/config.js';

const client = new webScrapingApiClient('ZbHDHviySZod8ScdlTfp4rA9gorbQLV9');

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

// https://www.lazada.vn/catalog/?q=nokia&from=input
export async function getHtmlAndExtract(link, extractRule) {
  const response = await client.get(
    link,
    {
      proxy_type: 'datacenter',
      session: 1,
      timeout: 10000,
      device: 'desktop',
      wait_until: 'domcontentloaded',
      wait_for: 15000,
      render_js: 1,
      extract_rules: extractRule,
    },
  );

  return !response.success ? [] : response.response.body;
}
