import * as mongoose from 'mongoose';
let ObjectId = mongoose.Schema.ObjectId;

let ProductSchema = new mongoose.Schema({
  sku: String,
  name: String,
  nameLower: String,
  slug: String,
  category: { type: ObjectId, ref: 'SubCategory' },
  status: String,
  brand: { type: ObjectId, ref: 'Brand' },
  description: String,
  variants: [{ image: String, price: Number, mrp: Number, weight: String, size: String }],
  features: Array,
  keyFeatures: Array,
  uid: String, // can not use ObjectId for join(as of Category) as we store email here
  vendor_id: { type: ObjectId, ref: 'User' },
  vendor_name: String, // Store vendor name here
  vendor_email: String, // can not use ObjectId for join(as of Category) as we store vendor email here
  updated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  approved: { type: Boolean, default: true },
  hot: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  isglobal:{type:Boolean,default:true},
  parentID:String,
  ParentCategoryID:String,
  q: String,
  new: { type: Boolean, default: false }
});
ProductSchema.pre('save', function (next) {
  this.q = this.sku ? this.sku + ' ' : ''
  this.q = this.name ? this.name + ' ' : ''
  this.q += this.description ? this.description + ' ' : ''
  this.q += this.vendor_name ? this.vendor_name + ' ' : ''
  this.q += this.status ? this.status + ' ' : ''
  this.q += this.isglobal ? this.isglobal + ' ' : ''
  this.q += this.parentID ? this.parentID + ' ' : ''
  this.q += this.ParentCategoryID ? this.ParentCategoryID + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Product', ProductSchema);
