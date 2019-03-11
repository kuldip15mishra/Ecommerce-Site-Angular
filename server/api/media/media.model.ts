

import * as mongoose from 'mongoose';
let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let MediaSchema = new mongoose.Schema({
  originalFilename: String,
  src: String,
  path: String,
  size: String,
  type: String,
  name: String,
  uid: { type: ObjectId, ref: "User" },
  uname: String,
  uemail: String,
  use: String,
  q: String,
  active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
  });

MediaSchema.pre('save', function (next) {
  this.q = this.originalFilename ? this.originalFilename + ' ' : ''
  this.q += this.src ? this.src + ' ' : ''
  this.q += this.path ? this.path + ' ' : ''
  this.q += this.size ? this.size + ' ' : ''
  this.q += this.type ? this.type + ' ' : ''
  this.q += this.name ? this.name + ' ' : ''
  this.q += this.uname ? this.uname + ' ' : ''
  this.q += this.uemail ? this.uemail + ' ' : ''
  this.q += this.use ? this.use + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Media', MediaSchema);
