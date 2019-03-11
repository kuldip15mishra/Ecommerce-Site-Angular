import Config from './../config';
import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as compose from 'composable-middleware';
import User from '../api/user/user.model';
import BaseCtrl from './../api/base';

let config = new Config();
import * as dotenv from 'dotenv';
dotenv.load({ path: '.env' });
const SESSION_SECRET = process.env.SESSION_SECRET || 'salientink5-secret';
let validateJwt = expressJwt({
  secret: SESSION_SECRET
});

let jwtUserInfo = expressJwt({
  secret: SESSION_SECRET,
  credentialsRequired: false
});

export default class AuthService extends BaseCtrl {
  model = User;
  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  isAuthenticated = () => {
    return compose()
      // Validate jwt
      .use(function (req, res, next) {
        // allow token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('token')) {
          req.headers.authorization = `Bearer ${req.query.token}`;
        }
        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        if (req.query && typeof req.headers.authorization === 'undefined') {
          req.headers.authorization = `Bearer ${req.cookies.token}`;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function (req, res, next) {
        User.findById(req.user._id).exec() //.select('_id email name role avatar active provider')
          .then(user => {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;
            next();
            return null;
          })
          .catch(err => next(err));
      });
  }

  /**
   * Attaches the user object to the request if authenticated
   * Otherwise blank
   */
  attachRegisterUserInfo = () => {
    return compose()
      // Validate jwt providing access to unregistered users
      // .use(function (req, res, next) {
      //   jwtUserInfo(req, res, next)
      // })
      .use(function (req, res, next) {
        if (req.user) {
          User.findById(req.user._id).exec() //.select('_id email name role avatar active provider')
            .then(user => {
              if (!user) {
                return res.status(401).end();
              }
              req.user = user;
              next();
              return null;
            })
            .catch(err => next(err));
        } else {
          next();
        }
      });
  }
  attachUserInfo = () => {
    return compose()
      // Validate jwt providing access to unregistered users
      .use(function (req, res, next) {
        jwtUserInfo(req, res, next)
      })
      .use(function (req, res, next) {
        if (req.user) {
          User.findById(req.user._id).exec() //.select('_id email name role avatar active provider')
            .then(user => {
              req.user = user;
              next();
              return null;
            })
            .catch(err => next(err));
        } else {
          next();
        }
      });
  }

  /**
   * Checks if the user role meets the minimum requirements of the route
   */
  hasRole = (roleRequired) => {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use(function meetsRequirements(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
          // if (config.userRoles.indexOf(roleRequired) >= 0) {
          return next();
        } else {
          return res.status(403).send('Forbidden');
        }
      });
  }

  /**
   * Checks if the user role meets the minimum requirements of the route
   */
  hasRoles = (roleRequired) => {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use(function meetsRequirements(req, res, next) {
        let authorized = false;
        for (let role of roleRequired) {
          authorized = config.userRoles.indexOf(req.user.role) === config.userRoles.indexOf(role) || authorized;
        }
        if (authorized) {
          return next();
        } else {
          return res.status(403).send('Forbidden');
        }
      });
  }

  /**
   * Returns a jwt token signed by the app secret
   */
  static signToken = (user) => {
    return jwt.sign({ _id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar }, SESSION_SECRET, {
      expiresIn: 60 * 60 * 24 * 7
    });
  }

  /**
   * Set token cookie directly for oAuth strategies
   */
  static setTokenCookie = (req, res) => {
    if (!req.user) {
      return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    let token = AuthService.signToken(req.user);
    res.cookie('token', token);
    res.redirect('/');
  }
}
