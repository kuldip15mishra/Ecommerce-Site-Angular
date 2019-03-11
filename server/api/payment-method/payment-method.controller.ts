import PaymentMethod from './payment-method.model';
import BaseCtrl from './../base';

export default class PaymentMethodCtrl extends BaseCtrl {
  model = PaymentMethod;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  //Get list of active PaymentMethods
  active = (req, res) => {
    PaymentMethod.find({ active: true }).exec(function (err, PaymentMethods) {
      if (err) { return this.handleError(res, err); }
      return res.status(200).json(PaymentMethods);
    });
  }
}