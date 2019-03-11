

import * as mongoose from 'mongoose';

let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
let SubCategorySchema = new mongoose.Schema({
  index: Number,
  name: String,
  slug: String,
  img: String,
  uid: String,
  q: String,
  updated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});
let CategorySchema = new mongoose.Schema({
  index: Number,
  name: String,
  slug: String,
  img: String,
  uid: String,
  updated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  isglobal :{ type: Boolean, default: true },
  parentID:{type:String,default:null},
  allocatedVal:{ type: Number, default: 0 },
  children: [SubCategorySchema],
});
CategorySchema.pre('save', function (next) {
  this.q = this.name ? this.name + ' ' : ''
  this.q += this.description ? this.description + ' ' : ''
  this.q += this.vendor_name ? this.vendor_name + ' ' : ''
  this.q += this.isglobal ? this.isglobal + ' ' : true,
  this.q += this.parentID ? this.parentID + ' ' : '',
  this.q += this.allocatedVal ? this.allocatedVal + ' ' : 0
  this.q += ' '
  if (!this.slug && this.name)
    this.slug = slugify(this.name);
  next();
});
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
mongoose.model('SubCategory', SubCategorySchema);
export default mongoose.model('Category', CategorySchema);
