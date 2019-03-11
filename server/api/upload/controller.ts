import Media from './../media/media.model';
import BaseCtrl from './../base';

export default class UploadCtrl extends BaseCtrl {
  model = Media;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
}


// import Media from './../media/media.model';
// import * as config from './../../config/environment/shared';
// import * as helper from './../../components/helper';
// import _ from 'lodash';
// import https from 'https';
// let multer = require('multer');
// // import * as media from './../media/media.controller';

// export function index(req, res) {
// }
// export function create(req, res) {
//     let storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, './uploads/');
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
//       // callback(null, req._id + '.' + file.originalname.split('.')[1]);
//     }
//   });
//   let upload = multer({ storage: storage }).single('file');
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end(err.toString());
//     }
//     req.file.path = req.file.path.replace("\\", "/");
//     req.body.src = req.file.path;
//     req.body.originalFilename = req.file.originalFilename;
//     req.body.uid = req.user._id;
//     req.body.uname = req.user.name;
//     req.body.name = req.file.originalname;
//     req.body.uemail = req.user.email;
//     req.body.size = req.file.size;
//     req.body.type = req.file.type;
//     req.body.use = req.body.use;
//     // console.log(req.file);

//     Media.create(req.body);
//     res.status(201).end(req.file.filename);
//   });
// }
// export function createProfile(req, res) {
//     let storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, './uploads/avatar/');
//     },
//     filename: function (req, file, callback) {
//       // callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
//       callback(null, req._id + '.' + file.originalname.split('.')[1]);
//     }
//   });
//   let upload = multer({ storage: storage }).single('file');
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end(err.toString());
//     }
//     res.end('Avatar is uploaded');
//     req.file.path = req.file.path.replace("\\", "/");
//     req.body.src = req.file.path;
//     req.body.originalFilename = req.file.originalFilename;
//     req.body.uid = req.user._id;
//     req.body.uname = req.user.name;
//     req.body.name = req.file.originalname;
//     req.body.uemail = req.user.email;
//     req.body.size = req.file.size;
//     req.body.type = req.file.type;
//     req.body.use = 'profile';

//     // console.log(req.file);

//     Media.create(req.body);
//     res.status(204).end();
//   });
//   // console.log(req.body); //other form fields
//   // console.log(req.file); //form files
// }