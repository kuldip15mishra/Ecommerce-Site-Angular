let express = require('express');
import User from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User);
require('./facebook/passport').setup(User);
require('./google/passport').setup(User);
require('./twitter/passport').setup(User);

let router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook').default);
router.use('/twitter', require('./twitter').default);
router.use('/google', require('./google').default);

module.exports = router;
