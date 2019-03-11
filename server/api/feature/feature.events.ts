/**
 * Feature model events
 */



import { EventEmitter } from 'events';
import Feature from './feature.model';
let FeatureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeatureEvents.setMaxListeners(0);

// Model events
let events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  let event = events[e];
  Feature.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    FeatureEvents.emit(event + ':' + doc._id, doc);
    FeatureEvents.emit(event, doc);
  };
}

export default FeatureEvents;
