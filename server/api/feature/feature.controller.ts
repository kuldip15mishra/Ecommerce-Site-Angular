import Feature from './feature.model';
import BaseCtrl from './../base';

export default class FeatureCtrl extends BaseCtrl {
  model = Feature;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  // import Feature from './feature.model';
  // import * as helper from './../../components/helper';

  // Get all features group
  group = (req, res) => {
    let async = require("async");
    let fe = [];
    Feature.find().distinct('key', function (err, feature) {
      let f = {};
      async.each(feature, function (k, callback) {
        let x: any = {};
        x.key = k;
        x.v = [];
        Feature.find({ key: k, active: true }).distinct('val').exec(function (err, v) {
          x.v = v;
          fe.push(x);
          callback();
        });
      },
        // 3rd param is the function to call when everything's done
        function (err) {
          if (err) { return res.status(404).send('Not Found'); } else { return res.status(200).json(fe); }
        }
      );
    });
  };
}