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
    apiKey: process.env.API_KEY,
    pathSearchByKeyWord: `${process.env.PATH_SEARCH_BY_KEYWORD}`.replace(
      'API_KEY',
      process.env.API_KEY,
    ),
  },
};

export default config;
