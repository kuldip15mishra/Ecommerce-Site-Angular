let paypal = require('paypal-rest-sdk');
import BaseCtrl from './../base';
import Order from './../order/order.model';
import Config from '../../config';
let config = new Config();


export default class OrderCtrl extends BaseCtrl {
  model = Order;
  PayPal = (req, res, next) => {
    let domain = process.env.DOMAIN || 'http://localhost:4200'
    let items = [];
    let subtotal = 0;
    let discount = 0;
    let data = JSON.parse(req.query.data);
    let options = JSON.parse(req.query.options);
    let total = 0;//data.price * data.quantity;
    let shortId = require('shortid');
    let orderNo = shortId.generate();
    // Set default checkout params
    options.exchange_rate = options.exchange_rate || 1;
    options.currency_code = options.paypal_currency;
    options.shipping = options.shipping || 0;
    options.discount = options.couponAmount || options.discount || 0;
    if (isNaN(options.exchange_rate) || options.exchange_rate === '') options.exchange_rate = 1;
    let shipping = Math.round(options.shipping * options.exchange_rate * 100) / 100;
    for (let k = 0; k < data.length; k++) {
      let i = data[k];
      let price = Math.round(i.price * options.exchange_rate * 100) / 100;
      subtotal = subtotal + price * i.quantity;
      items.push({ sku: i.sku, name: i.name, url: i.image, description: i.slug, price: price, quantity: i.quantity, currency: options.currency_code });
    }

    if (options.discount > 0) {
      discount = -Math.round(options.discount * options.exchange_rate * 100) / 100;
      items.push({ sku: '#', name: 'Coupon Discount', url: '-', description: '-', price: discount, quantity: 1, currency: options.currency_code });
    }
    subtotal = subtotal + discount;
    total = subtotal + shipping;

    paypal.configure({
      'mode': process.env.PAYPAL_MODE || 'sandbox', //sandbox or live
      'client_id': process.env.PAYPAL_CLIENT_ID || '',
      'client_secret': process.env.PAYPAL_CLIENT_SECRET || ''
    });
    //build PayPal payment request
    let payReq = {
      'intent': 'sale',
      'redirect_urls': {
        'return_url': domain + '/api/pay/process',
        'cancel_url': domain + '/api/pay/cancel'
      },
      'payer': {
        'payment_method': 'paypal',
        'payer_info': {
          'email': options.email,
          'payer_id': options.uid
        }
      },
      "transactions": [
        {
          "amount": {
            "total": total,//Math.round(options.total*options.exchange_rate*100)/100,
            "currency": options.currency_code,
            "details": {
              "subtotal": subtotal,//Math.round(options.subtotal*options.exchange_rate*100)/100,
              "shipping": shipping
            }
          },
          "invoice_number": orderNo,
          "custom": options.address.phone,
          "item_list": {
            "items": items,
            "shipping_address": {
              "recipient_name": options.address.recipient_name,
              "line1": options.address.line1,
              "city": options.address.city,
              "postal_code": options.address.postal_code,
              "state": "-",
              "country_code": options.address.country_code
            }
          }
        }
      ]
    }
    paypal.payment.create(payReq, function (error, payment) {
      if (error) {
        console.log('########################## Error', error);
        let msg = '', id = '000', code = '' // When noting defined in server/.env this will return 000
        if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
          msg = 'Not connected to internet'
        }
        else {
          code = '404'
          msg = JSON.stringify(error.response.details)
        }
        res.redirect(domain + '/admin/my-orders?id=' + id + '&msg=' + msg)
      } else {
        if (payment.state === 'created') payment.state = 'Pending';
        let orderDetails = {
          uid: payment.payer.payer_info.payer_id, email: options.email,
          phone: payment.transactions[0].custom,
          orderNo: payment.transactions[0].invoice_number,
          address: payment.transactions[0].item_list.shipping_address,
          status: 'Payment Initiated',
          items: payment.transactions[0].item_list.items,
          payment: { id: payment.id, state: payment.state, cart: payment.cart, email: payment.payer.payer_info.email, method: payment.payer.payment_method },
          amount: payment.transactions[0].amount,
          created: payment.created_time,
        }
        orderDetails.amount.exchange_rate = options.exchange_rate;
        // When order.status is null, the client will replace with the Array[0] of order status at Settings page
        // Order.create is from order.model not from order.controller
        Order.create(orderDetails);

        //capture HATEOAS links
        let links = {};
        //console.log('payment.links', payment.links);
        payment.links.forEach(function (linkObj) {
          links[linkObj.rel] = {
            'href': linkObj.href,
            'method': linkObj.method
          };
        })

        //if redirect url present, redirect user
        if (links.hasOwnProperty('approval_url')) {
          res.redirect(links['approval_url'].href);
        } else {
          console.error('no redirect URI present');
        }
      }
    });
  }

  success = (req, res, next) => {
    const paymentId = req.session.paymentId;
    const paymentDetails = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId, paymentDetails, (err) => {
      res.render('api/paypal', {
        result: true,
        success: !err
      });
    });
  }

  process = (req, res) => {
    let domain = process.env.DOMAIN || 'http://localhost:4200'
    let vm = this
    let paymentId = req.query.paymentId;
    let payerId = { 'payer_id': req.query.PayerID };
    let string = "";
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
      if (error) {
        // console.log('payment process error', error);
        Order.findOneAndUpdate({ 'payment.id': paymentId }, { status: 'Payment Error' }, { upsert: false, setDefaultsOnInsert: true, runValidators: true }).exec()
        string = encodeURIComponent('Error occured while receiving payment');
        res.redirect(domain + '/admin/my-orders?id=' + paymentId + '&msg=' + string);
      } else {
        let mailParams = {
          id: payment.id,
          to: payment.payer.payer_info.email,
          orderNo: payment.transactions[0].invoice_number,
          status: payment.state,
          payment_method: payment.payer.payment_method,
          amount: payment.transactions[0].amount,
          address: payment.payer.payer_info.shipping_address
        }
        if (payment.state === 'approved') {
          Order.findOneAndUpdate({ 'payment.id': payment.id }, { "status": 'Paid', "payment.state": 'Paid' }, { upsert: false, setDefaultsOnInsert: true, runValidators: true }).exec()
            .then(function (doc) {
              vm.email(config.orderPlacedEmail(mailParams));
              string = encodeURIComponent("Order Placed")
              res.redirect(domain + '/admin/my-orders?id=' + paymentId + '&msg=' + string)
            }).then(function (err) {
              if (err) {
                // console.log('Could not find the payment reference',err);
                vm.email(config.orderPlacedEmail(mailParams));
                string = encodeURIComponent("Payment Not Received")
                res.redirect('/admin/my-orders?id=' + paymentId + '&msg=' + string)
              }
            })
        } else {
          Order.findOneAndUpdate({ 'payment.id': payment.id }, { status: 'Payment Not Approved' }, { upsert: false, setDefaultsOnInsert: true, runValidators: true }).exec()
          string = encodeURIComponent('Payment Not Approved');
          res.redirect(domain + '/admin/my-orders?id=' + paymentId + '&msg=' + string);
        }
      }
    })
  }

  cancel = (req, res) => {
    let domain = process.env.DOMAIN || 'http://localhost:4200'
    let string = encodeURIComponent('Payment Cancelled');
    res.redirect(domain + '/admin/my-orders?msg=' + string);
  }
}
