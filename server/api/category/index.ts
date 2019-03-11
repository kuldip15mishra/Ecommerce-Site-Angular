let express = require('express');
import CategoryCtrl from './category.controller';
let controller = new CategoryCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.index);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/my', auth.isAuthenticated(), controller.index);
router.get('/path/:category', controller.path);
router.get('/all', controller.all);
router.get('/allPrivateVendorCategories', controller.allPrivateVendorsCategories);
router.post('/getParentCategoryID', controller.findbyCategoryID);
router.get('/loaded', controller.loaded);
router.get('/blind', controller.orphans);
router.get('/:id', controller.get);
router.post('/', auth.hasRole('manager'), controller.create);
router.post('/vendorCreate', auth.hasRole('privatevendor'), controller.createnew);
router.put('/', auth.hasRole('manager'), controller.put);
router.patch('/:id', auth.hasRole('manager'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.remove);
router.post('/find', controller.findbyID);
router.post('/addsubcategory', controller.addSubcategory);


module.exports = router;
