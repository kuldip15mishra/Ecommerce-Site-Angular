import UserCtrl from './user.controller';
const controller = new UserCtrl();
let express = require('express');
import AuthService from '../../auth/auth.service';
const auth = new AuthService();
let router = express.Router();

router.get('/', auth.hasRoles(['user', 'manager', 'admin']), controller.index);
router.get('/updateAllQ', controller.updateAllQ);
router.get('/users', auth.hasRole('manager'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.get);
router.get('/search/:q', controller.index);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.post('/', auth.attachRegisterUserInfo(), controller.create);
router.post('/forgot', controller.forgot);
router.post('/reset/:token', controller.reset);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
