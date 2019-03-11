import ShippingCtrl from './shipping.controller';
const controller = new ShippingCtrl();
let express = require('express');
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.index);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/best', controller.best);
router.get('/:id', controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
