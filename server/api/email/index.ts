import EmailCtrl from './email.controller';
const controller = new EmailCtrl();
let express = require('express');
let router = express.Router();

router.post('/contactus/', controller.contactUs);

module.exports = router;
