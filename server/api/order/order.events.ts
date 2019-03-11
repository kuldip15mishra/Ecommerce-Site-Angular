/**
 * Order model events
 */



import { EventEmitter } from 'events';
import Order from './order.model';
let OrderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OrderEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Order.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    OrderEvents.emit(event + ':' + doc._id, doc);
    OrderEvents.emit(event, doc);
  };
}

export default OrderEvents;
