import OrderHistory from './orderHistory.model';
import BaseCtrl from './../base';

export default class OrderHistoryCtrl extends BaseCtrl {
  model = OrderHistory;
  my = (req, res) => {

    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  fetchByUID = (req, res) => {

    //console.log(req.body);
    return OrderHistory.find({uid: req.body.id}).exec((err, docs) => {
    // return OrderHistory.find({}).exec((err, docs) => {
      if (err) { return console.error(err); }
      //console.log(docs)
      res.json(docs);
    });
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
}
