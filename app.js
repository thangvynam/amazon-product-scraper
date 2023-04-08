/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { config } from 'dotenv';
import session from 'express-session';
import bodyParser from 'body-parser';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
// eslint-disable-next-line import/no-cycle
import productsRouter from './routes/products.js';
import shopifyRouter from './routes/shopify.js';
import authRouter from './routes/auth.js';

import authMiddleware from './middlewares/auth.js';
import SessionService from './services/sessionService.js';

// load environment variables
config();

// initialize shopify api
const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_ADMIN_TOKEN,
  scopes: process.env.SHOPIFY_SCOPES,
  hostName: process.env.SHOPIFY_HOSTNAME,
  apiVersion: LATEST_API_VERSION,
  hostScheme: 'http',
  isCustomStoreApp: true,
  isEmbeddedApp: false,
  logger: {
    log: (severity, message) => {
      console.log(`Shopify logger: Severity ${severity} , message = ${message}`);
    },
  },
  restResources,
});
const app = express();
// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);
// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

const sessionShopify = shopify.session.customAppSession(process.env.SHOPIFY_HOSTNAME);
SessionService.storeSessionInCache(process.env.SESSION_SECRET_KEY, sessionShopify);

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', authMiddleware, productsRouter);
app.use('/shopify', authMiddleware, shopifyRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8888, () => {
  console.log('Listening on port 8888');
});

export { app, shopify };
