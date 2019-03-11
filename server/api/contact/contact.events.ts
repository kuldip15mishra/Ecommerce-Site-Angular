/**
 * Contact model events
 */



import { EventEmitter } from 'events';
import Contact from './contact.model';
let ContactEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContactEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Contact.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ContactEvents.emit(event + ':' + doc._id, doc);
    ContactEvents.emit(event, doc);
  };
}

export default ContactEvents;
