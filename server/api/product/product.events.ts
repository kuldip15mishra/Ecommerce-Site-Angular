/**
 * Product model events
 */



import { EventEmitter } from 'events';
import Product from './product.model';
let ProductEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProductEvents.setMaxListeners(0);

// Model events
let events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Product.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ProductEvents.emit(event + ':' + doc._id, doc);
    ProductEvents.emit(event, doc);
  }
}

export default ProductEvents;
