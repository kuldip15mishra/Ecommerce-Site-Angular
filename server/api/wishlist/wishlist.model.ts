

import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let WishlistSchema = new mongoose.Schema({
  product: { _id: ObjectId, name: String, slug: String, keyFeatures: [] },
  variant: { _id: ObjectId, size: String, weight: String, price: Number, mrp: Number, image: String },
  uid: ObjectId, name: String, q: String, email: String
}, { versionKey: false, timestamps: true });

WishlistSchema.pre('save', function (next) {
  this.q = this.uid ? this.uid + ' ' : ''
  this.q += this.name ? this.name + ' ' : ''
  this.q += this.email ? this.email + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Wishlist', WishlistSchema);
