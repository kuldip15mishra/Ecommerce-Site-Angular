import WishlistCtrl from './wishlist.controller';
const controller = new WishlistCtrl();
let express = require('express');
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/my', auth.hasRole('user'), controller.my);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/', auth.hasRole('user'), controller.index);
router.get('/product/:pid/:vid', auth.hasRole('user'), controller.productWish);
router.get('/:id', controller.get);
router.post('/', auth.attachUserInfo(), controller.createOrRemove);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('manager'), controller.delete);

module.exports = router;
