/**
 * Media model events
 */



import { EventEmitter } from 'events';
import Media from './media.model';
let MediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MediaEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Media.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    MediaEvents.emit(event + ':' + doc._id, doc);
    MediaEvents.emit(event, doc);
  };
}

export default MediaEvents;
