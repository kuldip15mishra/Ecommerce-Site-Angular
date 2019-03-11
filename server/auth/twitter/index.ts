let express = require('express');
let passport = require('passport');
import AuthService from '../auth.service';

let router = express.Router();
router
  .get('/', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }), AuthService.setTokenCookie);

export default router;
