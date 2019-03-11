import MediaController from './media.controller';
const controller = new MediaController();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let express = require('express');

let multiparty = require('connect-multiparty');
let multipartyMiddleware = multiparty();
let router = express.Router();

router.use(multiparty({ uploadDir: './uploads' }));

router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.get('/updateAllQ', controller.updateAllQ);
// router.post('/product', auth.isAuthenticated(), multipartyMiddleware, controller.updateProductImage);
// router.post('/profile', auth.isAuthenticated(), multipartyMiddleware, controller.updateProfile);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/:id', auth.isAuthenticated(), controller.get);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
