import { extend } from 'lodash';
import User from './user/user.model';

abstract class BaseCtrl {

  abstract model: any;

  // Check if JSON Object
  toJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return str;
    }
    return JSON.parse(str);
  }
  respondWithResult = (res: any, statusCode = 200) => {
    return function (entity) {
      if (entity) {
        res.status(statusCode).json(entity);
      }
    };
  }

  saveUpdates = (updates: any) => {
    return function (entity) {
      let updated = extend(entity, updates);
      return updated.save()
        .then(updated => {
          return updated;
        });
    };
  }

  removeEntity = (res: any) => {
    return function (entity) {
      if (entity) {
        return entity.remove()
          .then(() => {
            res.status(202).json({ msg: 'deleted' });
          });
      }
    };
  }

  patchUpdates = (patches) => {
    return function (entity) {
      try {
        entity = extend(entity, patches);
      } catch (err) {
        return Promise.reject(err);
      }
      return entity.save();
    };
  }
  handleEntityNotFound = (res: any) => {
    return function (entity) {
      if (!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  }

  handleError = (res: any, statusCode = 500) => {
    return function (err) {
      res.status(statusCode).send(err);
    };
  }
  email = (data) => {
    //console.log(data)
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(data).then(data => {
    })
      .catch(error => {
        console.error(error.toString());
      });
  }

  // Get all
  index = (req, res) => {
    let where = this.toJson(req.query.where);
    let search = this.toJson(req.query.search);
    if (!where) {
      where = {};
    }
    for (let s in search) {
      where[s] = { $regex: new RegExp(search[s], "ig") }
    }
    // if (search && search.name) {
    //   where.name = { $regex: new RegExp(search.name, "ig") };
    // }
    let select = this.toJson(req.query.select);
    let sort = req.query.sort || '-updatedAt';
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    this.model.find(where).select(select).sort(sort).limit(limit).skip(skip).exec()
      .then(this.respondWithResult(res))
      .catch(this.handleError(res));
  };

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  };

  // Insert
  insert = (req, res) => {
    this.model.create(req.body)
      .then(this.respondWithResult(res, 201))
      .catch(this.handleError(res));
  };

  // Get by id
  get = (req, res) => {
    this.model.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.respondWithResult(res))
      .catch(this.handleError(res));
  };

  // Update by id
  update = (req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    if (!req.body.slug && req.body.name)
      req.body.slug = req.body.name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

    this.model.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.patchUpdates(req.body))
      .then(this.respondWithResult(res))
      .catch(this.handleError(res));
  };

  // Delete by id
  delete = (req, res) => {
    this.model.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.removeEntity(res))
      .catch(this.handleError(res));
  }

  updateAllQ = (req, res) => { // Just to update the q field at model throught pre save trigger
    this.model.find({ active: true }, function (err, data) {
      data.forEach(data => {
        data.save()
      });
    }).then(x => {
      res.status(200).send('Success.')
    })
  }
}

export default BaseCtrl;
