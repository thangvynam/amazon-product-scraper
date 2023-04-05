import { config as _config } from 'dotenv';

// load environment variables
_config();

const config = {
  app: {
    tokenSecret: process.env.TOKEN_SECRET,
    env: process.env.NODE_ENV, // 'dev' or 'prod'
    userName: process.env.USER_NAME.split(','),
  },
  vendor: {
    hostVendor: process.env.HOST_VENDOR,
    pathSearchByKeyWord: `${process.env.PATH_SEARCH_BY_KEYWORD}`.replace(
      'API_KEY',
      process.env.API_KEY_AMAZON,
    ),
    apiKeyAbstract: process.env.API_KEY_ABSTRACT_SCRAPING,
  },
  extractRule: {
    lazada: {
      rule: process.env.EXTRACT_RULE_LAZADA,
    },
  },
  shopify: {
    token: process.env.SHOPIFY_API_TOKEN,
    secret_key: process.env.SHOPIFY_SECRET_KEY,
    hostname: process.env.SHOPIFY_HOSTNAME,
    scopes: process.env.SHOPIFY_SCOPES,
  },
};

export default config;
