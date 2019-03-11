let express = require('express');
import OrderHistoryCtrl from './orderHistory.controller';
import AuthService from '../../auth/auth.service';
let controller= new OrderHistoryCtrl();
let auth = new AuthService();
let router = express.Router();

//router.get('/:id', controller.fetchByUID);
router.post('/find', controller.fetchByUID);
//router.get('/', controller.index);
// router.get('/updateAllQ', controller.updateAllQ);
router.get('/my', auth.isAuthenticated(), controller.my);
//router.get('/:id', controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
// router.put('/:id', auth.isAuthenticated(), controller.update);
// router.patch('/:id', auth.isAuthenticated(), controller.update);
// router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
