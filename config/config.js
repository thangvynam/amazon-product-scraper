const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
    app: {
        tokenSecret: process.env.TOKEN_SECRET,
        debug: true,
    },
    vendor: {
        hostVendor: process.env.HOST_VENDOR,
        apiKey: process.env.API_KEY,
        pathSearchByKeyWord: (process.env.PATH_SEARCH_BY_KEYWORD + '').replace("API_KEY", process.env.API_KEY),
    }
}

const prod = {
    app: {
        tokenSecret: process.env.TOKEN_SECRET,
        debug: false
    },
    vendor: {
        hostVendor: process.env.HOST_VENDOR,
        apiKey: process.env.API_KEY,
        pathSearchByKeyWord: (process.env.PATH_SEARCH_BY_KEYWORD + '').replace("API_KEY", process.env.API_KEY),
    }
}

const config = {
    dev,
    prod
};

module.exports = config[env];