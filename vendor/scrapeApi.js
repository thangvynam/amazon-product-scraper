import { request as _request } from 'https';
import config from '../config/config.js';

export default function getListProductByKeyword(keyword) {
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
