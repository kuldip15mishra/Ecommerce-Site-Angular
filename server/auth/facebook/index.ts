let express = require('express');
let passport = require('passport');
import AuthService from '../auth.service';

let router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), AuthService.setTokenCookie);

export default router;
