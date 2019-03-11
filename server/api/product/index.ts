let express = require('express');
import ProductCtrl from './product.controller';
let controller = new ProductCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.getAll);
router.get('/updateAllQ', controller.updateAllQ);
// router.get('/search', controller.search);
router.get('/my', auth.hasRole('privatevendor'), controller.my);
router.get('/count', controller.count);
router.get('/priceRange', controller.priceRange);
router.get('/:id', controller.get);
router.get('/deep/:id', controller.showDeep);
router.post('/find', controller.findbyID);
// router.get('/best-sellers', controller.bestSellers);
router.post('/', auth.hasRole('privatevendor'), controller.create);
router.put('/:id', auth.hasRole('privatevendor'), controller.patch);
router.patch('/:id', auth.hasRole('privatevendor'), controller.patch);
router.delete('/:id', auth.hasRole('privatevendor'), controller.delete);

module.exports = router;
