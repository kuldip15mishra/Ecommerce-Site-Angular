import Order from './order.model';
import BaseCtrl from './../base';
import * as _ from 'lodash';
import Config from './../../config';
let config = new Config();
import Email from './../sendmail';
let email = new Email();

export default class OrderCtrl extends BaseCtrl {
  model = Order;

  pending = (req, res) => {
    req.query.where = { status: { $nin: ['Shipped', 'Delivered', 'Cancellation Requested', 'Cancelled'] } };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  shipped = (req, res) => {
    req.query.where = { status: 'Shipped' };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  cancelled = (req, res) => {
    req.query.where = { status: { $in: ['Cancellation Requested', 'Cancelled'] } };
    this.index(req, res);
  }
  delivered = (req, res) => {
    req.query.where = { status: 'Delivered' };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }

  // Get all orders by a user
  myOrders = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-createdAt';
    this.index(req, res);
  }
  orderPlaced = (res: any, statusCode = 200) => {
    let vm = this;
    return function (entity) {
      if (entity) {
        let mailParams = { id: '', to: entity.email, orderNo: entity.orderNo, status: entity.status, payment_method: entity.payment.method, amount: entity.amount, address: entity.address }
        vm.email(config.orderPlacedEmail(mailParams));
        res.status(statusCode).json(entity);
      }
    };
  }
  orderUpdated = (res: any, statusCode = 200) => {
    let vm = this;
    return function (entity) {
      if (entity) {
        let mailParams = { id: '', to: entity.email, orderNo: entity.orderNo, status: entity.status, payment_method: entity.payment.method, amount: entity.amount, address: entity.address }
        vm.email(config.orderUpdatedEmail(mailParams));
        res.status(statusCode).json(entity);
      }
    };
  }
  // Creates a new Order in the DB
  create = (req, res) => {
    req.body.uid = req.user._id; // id change on every user creation hence email is used
    req.body.email = req.user.email; // id change on every user creation hence email is used
    let shortId = require('shortid');
    req.body.orderNo = shortId.generate();
    Order.create(req.body).then(this.orderPlaced(res, 201))
      .catch(this.handleError(res));
  }

  patch = (req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    if (!req.body.slug && req.body.name)
      req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

    Order.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.patchUpdates(req.body))
      .then(this.orderUpdated(res))
      .catch(this.handleError(res));
  }
}