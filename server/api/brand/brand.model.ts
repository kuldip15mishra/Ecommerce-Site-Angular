import * as mongoose from 'mongoose';

let BrandSchema = new mongoose.Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: String,
  brand: Number,
  q: String,
  active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
  });
BrandSchema.pre('save', function (next) {
  this.q = this.name ? this.name + ' ' : ''
  this.q += this.info ? this.info + ' ' : ''
  this.q += this.parent ? this.parent + ' ' : ''
  this.q += this.brand ? this.brand + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Brand', BrandSchema);  