import User from './user.model';
import BaseCtrl from './../base';
import Config from '../../config';
import * as jwt from 'jsonwebtoken';
import * as async from 'async';
import * as crypto from 'crypto';
import * as Mailer from '../sendmail'

import AuthService from './../../auth/auth.service';
let auth = new AuthService();
let config = new Config();

export default class UsersCtrl extends BaseCtrl {
    model = User;
    validationError = (res, statusCode) =>  {
        statusCode = statusCode || 422;
        return function (err) {
            if (err.errors && err.errors.email.message) {
                err = err.errors.email;
            }
            return res.status(statusCode).json(err);
        };
    }
    handleError = (res, statusCode) =>  {
        statusCode = statusCode || 500;
        return function (err) {
            return res.status(statusCode).send(err);
        };
    }
    // Reset password route
    reset = (req, res, next) =>  {
        let vm = this
        async.waterfall([
            function (done) {
                User.findOne( {resetPasswordToken:req.params.token, resetPasswordExpires: {$gt:Date.now()}}, function (err, user) {
                    if ( ! user) {
                        return res.status(422).json( {'message':'Password reset email is invalid or has expired.'});
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    req.body.to = user.email
                    user.save()
                        .then(function () {
                            vm.email(config.resetPasswordEmail(req.body));
                            return res.status(200).json( {'message':'Success! Your password has been changed.'});
                        })
                        .catch(function (err) {
                            let statusCode = 422;
                            return function (err) {
                                if (err.errors && err.errors.email.message) {
                                    err = err.errors.email;
                                }
                                return res.status(statusCode).json(err);
                            }
                        });
                });
            }
        ], function (err) {
            if (err)return next(err);
        });
    }
    // Forgot password route
    forgot = (req, res, next) =>  {
        let vm = this
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    let token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                User.findOne( {email:req.body.email })
                    .then(user =>  {
                        if ( ! user) {
                            return res.status(422).json( {'message':'No account with that email address exists.'});
                        }
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function (err) {
                            done(err, token, user);
                        });
                    });
            },
            function (token, user, done) {
                // req.body.headers =  req.headers
                req.body.to = user.email;
                req.body.host = req.headers.host;
                req.body.token = token;
                vm.email(config.forgotPasswordEmail(req.body));
                return res.status(200).json( {'message':'An e-mail has been sent to ' + user.email + ' with instructions.'});
            }
        ], function (err) {
            if (err)return next(err);
        });
    }

    getAll = (req, res) =>  {
        let q =  {};
        let query = this.toJson(req.query);
        let select, sort, skip, limit;
        if (query) {
            if (this.toJson(query.where))q = this.toJson(query.where);
            select = this.toJson(query.select);
            sort = query.sort;
            skip = parseInt(query.skip);
            limit = parseInt(query.limit);
        }
        return User.find(q, '-salt -password').limit(limit).skip(skip).sort(sort).select(select).exec()
            .then(users =>  {
                return res.status(200).json(users);
            })
            .catch(this.handleError);
    }

    /**
     * Creates a new user
     */
    create = (req, res) =>  {
        let newUser = new User(req.body);
        let vm = this
        //console.log(newUser)
        newUser.provider = 'local';
        let role = newUser.role || 'user';
        newUser.role = role;

        newUser.save()
            .then(function (user) {
                let token = AuthService.signToken(user);
                if (role === 'privatevendor' || role === 'vendorprivateuser') {let MailBody =  {
                    from:'admin@sportscenter.com',
                    to:user.email,
                    subject:role === 'privatevendor'?'New Vendor Creation ':role === 'vendorprivateuser'?'Vendor Private User Created':'',
                    text:'This is Dummy Test Mail for User Creation'

                }
                vm.email(MailBody); }
                res.status(200).json( {token:token, user: {email:user.email, name:user.name, role:user.role, provider:user.provider, token:token }});
            })
            .catch(function (err) {
                if (err.errors && err.errors.email.message) {
                    err = err.errors.email.message;
                }
                res.status(422).json( {message:err });
            });
    }
    /**
     * Change a users password
     */
    changePassword = (req, res) =>  {
        let userId = req.user._id;
        let oldPass = String(req.body.oldPassword);
        let newPass = String(req.body.newPassword);
        return User.findById(userId).exec()
            .then(user =>  {
                if (user.authenticate(oldPass)) {
                    user.password = newPass;
                    return user.save()
                        .then(() =>  {
                            return res.status(200).send( {message:'Password changed successfully'});
                        })
                        .catch(this.validationError);
                }else {
                    return res.status(403).send( {message:'Incorrect old Password'});
                }
            });
    }

    /**
     * Get my info
     */
    me = (req, res, next) =>  {
        let userId = req.user._id;

        return User.findOne( {_id:userId }, '-salt -password').exec()
            .then(user =>  {// don't ever give out the password or salt
                if (!user) {
                    return res.status(401).end();
                }
                return res.json(user);
            })
            .catch(err => next(err));
    }

    /**
     * Authentication callback
     */
    authCallback = (req, res) => {
        res.redirect('/');
    }
}


