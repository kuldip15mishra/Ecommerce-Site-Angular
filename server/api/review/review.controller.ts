import Review from './review.model';
import BaseCtrl from './../base';
import Config from './../../config';
let config = new Config();
export default class ReviewCtrl extends BaseCtrl {
  model = Review;

  productReview = (req, res) => {
    req.query.where = { pid: req.params.id };
    req.query.sort = '-created';
    this.index(req, res);
  }

  myReviewOfProduct = (req, res) => {
    let q: any = { email: req.user.email };
    if (req.user.role === 'vendor') // get my own review for other product and review for my own product as well 
      q = { $or: [{ vendor_email: req.user.email }, { email: req.user.email }] };
    if (req.user.role === 'admin') q = {};
    req.query.where = q;
    req.query.sort = '-created';
    this.index(req, res);
  }

  // Gets a list of Reviews for product-details page
  my = (req, res) => {
    let q: any = { pid: req.query.pid, active: true }
    if (req.user) q = { $or: [q, { email: req.user.email, pid: req.query.pid }] }
    req.query.where = q;
    this.index(req, res);
  }

  // Creates a new Review in the DB
  create = (req, res) => {
    req.body.uid = req.user.email;
    if (config.reviewSettings.moderate)
      req.body.active = false;
    this.insert(req, res);
  }

}