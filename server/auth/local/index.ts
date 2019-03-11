let express = require('express');
let passport = require('passport');
import AuthService from '../auth.service';
let router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    let error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }

    let token = AuthService.signToken(user);
    user.token = token;
    res.status(200).json({ token: token, user: user });
  })(req, res, next);
});

module.exports = router;