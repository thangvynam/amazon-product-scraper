import { config as _config } from 'dotenv';

// load environment variables
_config();

const config = {
  app: {
    tokenSecret: process.env.TOKEN_SECRET,
    env: process.env.NODE_ENV, // 'dev' or 'prod'
    userName: process.env.USER_NAME.split(','),
    session_key: process.env.SESSION_SECRET_KEY,
    extract_data_path: process.env.EXTRACT_DATA_PATH,
    extracted_list_file_name: process.env.EXTRACTED_LIST_FILE_NAME,
    extracted_sku_list_file_name: process.env.EXTRACTED_SKU_LIST_FILE_NAME,
    provider: process.env.SCRAPING_API_PROVIDER,
  },
  vendor: {
    hostVendor: process.env.HOST_VENDOR,
    hostHighLevelVendor: process.env.HOST_HIGH_LEVEL_VENDOR,
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
    shopee: {
      rule: process.env.EXTRACT_RULE_SHOPEE,
    },
  },
  shopify: {
    token: process.env.SHOPIFY_API_TOKEN,
    secret_key: process.env.SHOPIFY_SECRET_KEY,
    hostname: process.env.SHOPIFY_HOSTNAME,
    scopes: process.env.SHOPIFY_SCOPES,
    session_secret_key: process.env.SESSION_SECRET_KEY,
  },
};

export default config;
