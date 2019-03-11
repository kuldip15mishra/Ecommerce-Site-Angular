let express = require('express');
import ReviewCtrl from './review.controller';
let controller = new ReviewCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/my', auth.attachUserInfo(), controller.myReviewOfProduct);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/', controller.index);
router.get('/product/:id', controller.productReview);
router.get('/my/product/:id', auth.hasRole('user'), controller.index);
router.get('/:id', controller.get);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('user'), controller.delete);

module.exports = router;
