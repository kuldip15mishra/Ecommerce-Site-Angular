import Wishlist from './wishlist.model';
import BaseCtrl from './../base';

export default class WishlistCtrl extends BaseCtrl {
  model = Wishlist;

  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  productWish = (req, res) => {
    req.query.where = { uid: req.user._id, 'product._id': req.params.pid, 'variant._id': req.params.vid };
    return this.index(req, res);
  }

  // Gets a list of Wishlists
  my = (req, res) => {
    let q: any = {}
    if (req.user) {
      q.email = req.user.email;
    } else {
      q.name = '~!!@~!~*&^%$#!@@!#asds12' // Some randome string so that blank value will be returned
    }
    req.query.where = q;
    req.query.sort = '-created';
    return this.index(req, res);
  }

  // Creates a new Wishlist in the DB
  createOrRemove = (req, res) => {
    let q = this.toJson(req.body);
    let q1 = {};
    let vm = this;
    q1 = { 'variant._id': q.variant._id, 'product._id': q.product._id, email: req.user.email, uid: req.user._id }
    Wishlist.find(q1).exec().then(function (r) {
      if (r.length > 0) {
        req.params.id = r[0]._id;
        vm.delete(req, res);
      } else {
        req.body.uid = req.user._id;
        req.body.email = req.user.email;
        vm.insert(req, res);
      }
    });
  }
}