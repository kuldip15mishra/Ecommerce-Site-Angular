import Shipping from './shipping.model';
import BaseCtrl from './../base';
import * as _ from 'lodash';

export default class ShippingCtrl extends BaseCtrl {
  model = Shipping;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  // Get all features group
  best = (req, res) => {
    if (req.query) {
      let params = req.query;
      let weight = params.weight;
      let cartValue = params.cartValue;
      let q: any = {};
      q.active = true;
      // q.country = params.country;
      let minPrice = 1000000;
      let minFreeShipping = 1000000;
      let best: any = {};
      let free: any = {};
      let vm = this;
      Shipping.find(q, function (err, data) {
        if (err) vm.handleError(res, err)
        if (data.length <= 0) vm.handleError(res, err)
        for (let s of data) {
          if (s.freeShipping <= cartValue) {
            minPrice = 0;
            best = s;
            best.charge = 0;
            free.carrier = s.carrier;
            // return res.status(200).json([best]); // Converted to array as expected by the requester
            return false;
          }

          if (isNaN(weight))
            weight = 0;

          if (s.maxWeight > weight && s.minWeight <= weight) { // Wish to ship to the proposed address
            if (s.charge < minPrice) {
              minPrice = s.charge;
              best = s;
            }
            if (s.freeShipping < minFreeShipping) {
              minFreeShipping = s.freeShipping;
              free = s;
            }
          }
        }
        let r = { best: best, free: free }
        return res.status(200).json([r]); // Converted to array as expected by the requester
      });
    }
  }
}