let express = require('express');
let passport = require('passport');
import AuthService from '../auth.service';

let router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'profile',
      'email'
    ],
    session: false
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), AuthService.setTokenCookie);

export default router;
