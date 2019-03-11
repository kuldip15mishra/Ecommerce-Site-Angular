

import * as mongoose from 'mongoose';
let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let OrderSchema = new mongoose.Schema({
  uid: String,
  email: String,
  phone: String,
  orderNo: String,
  address: Object,
  payment: Object,
  amount: Object,
  exchange_rate: Number,
  items: [{ name: String, sku: { type: ObjectId, ref: 'Product' }, description: String, price: String, quantity: String, url: String, status: { type: String, default: 'Order Received' } }],
  status: { type: String, default: 'Order Placed' },
  comment: String,
  active: { type: Boolean, default: true },
  payment_method: String,
  q: String,
}, { versionKey: false, timestamps: true });

OrderSchema.pre('save', function (next) {
  this.q = this.uid ? this.uid + ' ' : ''
  this.q += this.email ? this.email + ' ' : ''
  this.q += this.phone ? this.phone + ' ' : ''
  this.q += this.orderNo ? this.orderNo + ' ' : ''
  this.q += this.comment ? this.comment + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += this.payment_method ? this.payment_method + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Order', OrderSchema);
