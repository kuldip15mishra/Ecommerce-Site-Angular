

import * as mongoose from 'mongoose';

let PaymentMethodSchema = new mongoose.Schema({
  name: String,
  email: String,
  options: Object,
  q: String,
  active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
  });
PaymentMethodSchema.pre('save', function (next) {
  this.q = this.name ? this.name + ' ' : ''
  this.q += this.email ? this.email + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('PaymentMethod', PaymentMethodSchema);
