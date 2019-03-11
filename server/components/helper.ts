// import twilio from 'twilio';

// const path = require('path');
// import * as mailer from './../api/sendmail/send';
// import User from './../api/user/user.model';
// import * as _ from 'lodash';

// export function toJson(str) {
//   try {
//     str = JSON.parse(str);
//   } catch (e) {
//     str = str;
//   }
//   return str
// }

// function isObject(o) {
//   return null != o &&
//     typeof o === 'object' &&
//     Object.prototype.toString.call(o) === '[object Object]';
// }

// export function getQueryParams(user) {
//   var q = {};
//   if (user.role === 'user') {
//     q.assigned = user._id;
//   }
//   return q;
// }
// export function respondFromIndex(res, role, statusCode) {
//   statusCode = statusCode || 200;
//   return function (entity) {
//     return res.status(statusCode).json(entity);
//   }
// }

// export function respondWithResult(res, role, statusCode) {
//   statusCode = statusCode || 200;
//   return function (entity) {
//     var returnObj = {};
//     if (entity) {
//       return res.status(statusCode).json(entity);
//     }
//     return null;
//   };
// }

// export function orderPlaced(res, statusCode) {
//   res.req.body.to = res.req.body.email;
//   res.req.body.id = 'Cash';
//   mailer.send(config.mailOptions.orderPlaced(res.req.body))

//   statusCode = statusCode || 200;
//   return function (entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }

// export function orderUpdated(res, statusCode) {
//   mailer.send(config.mailOptions.orderUpdated(res.req.body))

//   statusCode = statusCode || 200;
//   return function (entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }
// export function rejectProduct(userId) {
//   return function (entity) {
//     try {
//       if (!entity.rejected) entity.rejected = [];
//       entity.rejected.push(userId);
//       var index = entity.assigned.indexOf(userId);
//       if (index > -1) entity.assigned.splice(index, 1); // Remove from assigned list
//       entity = _.extend(entity, { rejected: userId }); // Insert into rejected list
//     } catch (err) {
//       return Promise.reject(err);
//     }
//     return entity.save();
//   };
// }

// export function acceptProduct(userId) {
//   return function (entity) {
//     try {
//       if (!entity.accepted) entity.accepted = [];
//       entity.accepted.push(userId);
//       var index = entity.assigned.indexOf(userId);
//       if (index > -1) entity.assigned.splice(index, 1); // Remove from assigned list
//       entity = _.extend(entity, { accepted: userId }); // Insert into accepted list
//     } catch (err) {
//       return Promise.reject(err);
//     }
//     return entity.save();
//   };
// }

// export function patchUpdates(patches) {
//   return function (entity) {
//     try {
//       var entity = _.extend(entity, patches);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//     return entity.save();
//   };
// }

// export function removeEntity(res) {
//   return function (entity) {
//     if (entity) {
//       return entity.remove()
//         .then(() => {
//           return res.status(204).end();
//         });
//     }
//   };
// }

// export function handleEntityNotFound(res) {
//   return function (entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }

// export function handleError(res, statusCode) {
//   statusCode = statusCode || 500;
//   return function (err) {
//     return res.status(statusCode).send(err);
//   };
// }

// export function sendEmail(body) {
//   User.findById(body.uid).exec()
//     .then(function (user) {
//       if (!user)
//         return;
//       if (!user.emailEnabled) // When user unsubscribed email alert
//         return;
//       mailer.send(config.mailOptions.statusUpdate(user.email, body))
//     }).then(function (err) {
//       // console.log('User Not Found', err);
//     })
// }

// export function sendProductEmail(pkg) {
//   User.find().exec()
//     .then(function (users) {
//       if (!users)
//         return;
//       var emailConfig = {
//         from: 'admin@sportscenter.com',
//         subject: 'New Product has been added',
//         text: `Your admin has introduced a new product
//         name: ${pkg.name} \n 
//         destination: ${pkg.destination} \n`
//       };
//       var emailConfigs = [];
//       _.each(users, function (user) {
//         emailConfig.to = user.email;
//         mailer.send(emailConfig);
//       });
//     }).then(function (err) {
//       // console.log('User Not Found', err);
//     })
// }

// export function sendSms(status, uid, step) {
//   if (!config.smsEnabled || status === 'Draft' || step !== 100) // Check if appwide sms is enabled
//     return;
//   User.findById(uid).exec()
//     .then(function (user) {
//       if (!user)
//         return;
//       if (!user.smsEnabled) // When user unsubscribed sms alert
//         return;
//       var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//       client.messages.create({
//         body: user.firstName + ', your court paperwork status has been updated to ' + status,
//         to: user.mobile,  // Text this number
//         from: process.env.TWILIO_PHONE_NO // From a valid Twilio number
//       }, function (err, message) {
//         console.log(err);
//       });
//     })
// }

