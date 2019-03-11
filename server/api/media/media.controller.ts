import Media from './media.model';
import BaseCtrl from './../base';
// import * as sharp from 'sharp' // Excluded sharp because it requires build tools which is always hard to install in windows
export default class MediaCtrl extends BaseCtrl {
  model = Media;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-createdAt';
    this.index(req, res);
  }

  // Creates a new Media in the DB
  create = (req, res) => {
    req.body = req.files.file;
    req.body.uid = req.user._id;
    req.body.uname = req.user.name;
    req.body.uemail = req.user.email;
    this.insert(req, res);
  }
}