let express = require('express');
import OrderCtrl from './order.controller';
let controller = new OrderCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/my', auth.isAuthenticated(), controller.myOrders);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/', auth.hasRole('vendor'), controller.index);
router.get('/pending', auth.hasRole('vendor'), controller.pending);
router.get('/shipped', auth.hasRole('vendor'), controller.shipped);
router.get('/cancelled', auth.hasRole('vendor'), controller.cancelled);
router.get('/delivered', auth.hasRole('vendor'), controller.delivered);
router.get('/:id', auth.hasRole('vendor'), controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('vendor'), controller.patch);
router.patch('/:id', auth.hasRole('vendor'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
