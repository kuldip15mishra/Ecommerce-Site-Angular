import Category from './category.model';
import BaseCtrl from './../base';
import { each, has, pull } from 'lodash';

export default class CategoryCtrl extends BaseCtrl {
  model = Category;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  createnew = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  remove = (req, res) => {
    req.body.uid = req.user._id;
    Category.update({}, { $pull: { children: { _id: req.params.id } } }, { multi: true }).exec()
      .then((data) => {
        res.status(202).json({ msg: 'deleted' });
      })
      .catch(this.handleError(res));
  }

  index = (req, res) => {
    //console.log('index')
    return Category.find({isglobal: true}).exec((err, docs) => {
      if (err) { return console.error(err); }
      //console.log(docs)
      res.json(docs);
    });
  }

  findbyID =(req,res)=> {
//    console.log(req.body.id)
    return Category.find({ _id: req.body.id}).exec((err, docs) => {
      if (err) { return console.error(err); }
      //console.log(docs)
      res.json(docs);
    });
  }


  findbyCategoryID =(req,res)=> {
    console.log('findbyCategoryID');
       console.log(req.body);
       //return Category.find({children: {_id: "57c190f7993c5fe64d000004"}}).exec((err, docs) => {
        
      //  return Category.find(   { children: { $elemMatch: { _id: req.body.id } } }).exec((err, docs) => {
        return Category.find( { $or: [ { _id: req.body.id },  { children: { $elemMatch: { _id: req.body.id } } } ] } ).exec((err, docs) => {
      
       if (err) { return console.error(err); }
          //console.log(docs)
          res.json(docs);
        });
      }
  // Gets a list of Categories
  orphans = (req, res) => {
    req.query.where = { children: null };
    this.index(req, res);
  }

  // Get only those categories which has a product ** Not working
  loaded = (req, res) => {

    return Category.find({ parent: null }).
      populate({
        path: 'children', match: { products: { $exists: true, $ne: [] } }, populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children' }) }) }) }) }) }) }) })
      }).sort('-name').exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
  }

  // Gets a list of Categories
  all = (req, res) => {

    return Category.find().sort({ name: 1 }).exec((err, docs) => {
      let allCategories = []
      for (let d of docs) {
        //allCategories = allCategories.concat(d.children)
        allCategories.push(d)
      }
      if (err) { return console.error(err); }
      res.json(allCategories);
    });
  }

  // Gets a list of Categories for PrivateVendors
  allPrivateVendorsCategories = (req, res) => {

    return Category.find({ parentID: req.query.parentID}).sort({ name: 1 }).exec((err, docs) => {
      let allCategories = []

      for (let d of docs) {
        if(d && d.children)
          {
            allCategories = allCategories.concat(d);
            if(d.children)
             {allCategories = allCategories.concat(d.children);}
          }
      }
      //console.log(allCategories);
      if (err) { return console.log(err); }
      res.json(allCategories);
    });
  }

  path = (req, res) => {
    return Category.find({ _id: req.params.category }).
      populate({
        path: 'parent',
        // Get categories of categories - populate the 'categories' array for every category
        populate: [{ path: 'parent' }, { path: 'children' }]
      }).exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
  }

  put = (req, res) => {
    Category.remove({}, function () {
      Category.insertMany(req.body)
        .then(function (mongooseDocuments) {
          res.status(200).json({});
        })
        .catch(function (err) {
        });
    });
  }
  addSubcategory=(req, res)=>{
    console.log('updatepatch')
    console.log(req.body);
    console.log(req.body._id);
    // if (req.body._id) {
    //   delete req.body._id;
    // }
   Category.update({_id: req.body._id}, { $push: { children:  req.body  } }, { multi: false }).exec()
      .then((data) => {
        console.log(data)
        res.status(202).json({ msg: 'deleted' });
      })
      .catch(this.handleError(res));
   
  //  findByIdAndUpdate(  req.body._id,
  //  {$push: {children: req.body}},
  //   {safe: true, upsert: true},
  //   function(err, doc) {
  //       if(err){
  //       console.log(err);
  //       }else{
  //       console.log(doc)
  //       }
  //   }
  //  );
      // Category.findById(req.body._id).exec()
      // .then(this.handleEntityNotFound(res))
      // .then(this.patchUpdates(req.body)) 
      // .catch(this.handleError(res));
  }
  
  patch = (req, res) => {
  }
}
