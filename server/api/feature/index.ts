let express = require('express');
import FeatureCtrl from './feature.controller';
let controller = new FeatureCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.index);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/group', controller.group);
router.get('/:id', controller.get);
router.post('/', auth.hasRole('manager'), controller.create);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
