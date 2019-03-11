/**
 * Review model events
 */



import { EventEmitter } from 'events';
import Review from './review.model';
let ReviewEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReviewEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Review.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ReviewEvents.emit(event + ':' + doc._id, doc);
    ReviewEvents.emit(event, doc);
  };
}

export default ReviewEvents;
