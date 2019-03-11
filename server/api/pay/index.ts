'use strict';

import { Router } from 'express';
import * as auth from '../../auth/auth.service';
import PaypalCtrl from './paypal.controller';
let controller = new PaypalCtrl();

let router = new Router();
router.get('/paypal', controller.PayPal);
router.get('/success', controller.success);
router.get('/process', controller.process);
router.get('/cancel', controller.cancel);

module.exports = router;