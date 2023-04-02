import { request as _request } from 'https';
import webScrapingApiClient from 'webscrapingapi';

import config from '../config/config.js';

const client = new webScrapingApiClient(config.vendor.apiKeyAbstract);

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

  if (!response.success) {
    console.error(response.error);
  }

  return !response.success ? [] : response.response.body;
}
