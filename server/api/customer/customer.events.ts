/**
 * Customer model events
 */



import { EventEmitter } from 'events';
import Customer from './customer.model';
let CustomerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CustomerEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Customer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CustomerEvents.emit(event + ':' + doc._id, doc);
    CustomerEvents.emit(event, doc);
  };
}

export default CustomerEvents;
