

import * as mongoose from 'mongoose';

let CouponSchema = new mongoose.Schema({
  code: String,
  amount: Number,
  type: { type: String, default: 'Discount' },
  active: { type: Boolean, default: true },
  info: String,
  minimumCartValue: Number,
  q: String
}, {
    versionKey: false,
    timestamps: true
  });
CouponSchema.pre('save', function (next) {
  this.q = this.code ? this.code + ' ' : ''
  this.q += this.amount ? this.amount + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += this.info ? this.info + ' ' : ''
  this.q += this.minimumCartValue ? this.minimumCartValue + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Coupon', CouponSchema);
