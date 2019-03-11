/**
 * Wishlist model events
 */



import { EventEmitter } from 'events';
import Wishlist from './wishlist.model';
let WishlistEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WishlistEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Wishlist.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    WishlistEvents.emit(event + ':' + doc._id, doc);
    WishlistEvents.emit(event, doc);
  };
}

export default WishlistEvents;
