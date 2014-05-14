'use strict'

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  externalId: { type: String, required: true },             // id used by external system (e.g. Nextbus stopId)
  name: { type: String, required: true },                 
  location: { type: [], required: true },                   // [ longitude, latitude ]
  direction: {
    name: { type: String, required: true },                 // Short-name for direction (e.g. Outbound, Inbound)
    description: { type: String, required: true },          // Longer description of direction (e.g. Inbound to Downtown)
  },
  // Denormalize for effecient search and aggregation
  routeName: { type: String, required: true }              // Short-name for the route
});

// Ensure 2D index on location for geo queries
schema.index({ location: '2d' });

module.exports = mongoose.model('Stop', schema);
