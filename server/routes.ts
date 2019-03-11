// import errors from './components/errors';
import * as path from 'path';
import * as express from 'express';

export default function (app) {
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/media', require('./api/media'));
  // app.use('/api/upload', require('./api/upload'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/orderhistory', require('./api/orderHistory'));
  app.use('/api/coupons', require('./api/coupon'));
  app.use('/api/brands', require('./api/brand'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/features', require('./api/feature'));
  app.use('/api/addresses', require('./api/address'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/wishlists', require('./api/wishlist'));
  app.use('/api/shippings', require('./api/shipping'));
  app.use('/api/pay', require('./api/pay'));
  app.use('/api/email', require('./api/email'));
  app.use('/auth', require('./auth'));

  app.use(express.static('public'));
  // app.use('/', express.static(path.join(__dirname, './public')));
  app.use('/uploads', express.static('uploads'));

  // // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`./public/index.html`));
    });
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });
}
