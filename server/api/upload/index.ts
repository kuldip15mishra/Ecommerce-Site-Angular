import UploadCtrl from './controller';
const controller = new UploadCtrl();
let express = require('express');
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.index); // Assigned but not accepted or rejected
router.get('/my', auth.isAuthenticated(), controller.index); // Assigned but not accepted or rejected
router.get('/:id', auth.isAuthenticated(), controller.get);
router.post('/', auth.hasRole('user'), controller.create);
router.patch('/:id', auth.hasRole('user'), auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
