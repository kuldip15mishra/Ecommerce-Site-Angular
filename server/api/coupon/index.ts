let express = require('express');
import CouponCtrl from './coupon.controller';
let controller = new CouponCtrl();
let router = express.Router();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();

router.get('/', controller.index);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/:id', controller.get);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
