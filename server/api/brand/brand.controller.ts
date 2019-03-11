import Brand from './brand.model';
import BaseCtrl from './../base';

export default class BrandsCtrl extends BaseCtrl {
  model = Brand;
  my = (req, res) => {
    let q: any = { uid: req.user._id };
    if (req.query.search) {
      q.name = new RegExp(req.query.search.name.toLowerCase(), 'i');
    }
    req.query.where = q;
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
}

