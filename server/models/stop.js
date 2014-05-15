'use strict'

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  externalId: { type: String, required: true },             // Id used by external system to identify stop (e.g. Nextbus stopId)
  name: { type: String, required: true },                 
  location: { type: [], required: true },                   // [ longitude, latitude ]
  direction: {
    name: { type: String, required: true },                 // Short-name for direction (e.g. Outbound, Inbound)
    description: { type: String, required: true },          // Longer description of direction (e.g. Inbound to Downtown)
  },

  // Denormalize for effecient search and aggregation
  agencyExternalId: { type: String, required: true },       // Id used for external system to identify the agency (e.g. sf-muni) 
  routeExternalId: { type: String, required: true },        // Id usee for external system to idenfity a route (e.g. J-Church)
  routeName: { type: String, required: true }               // Short-name for the route
});

// Ensure 2D index on location for geo queries
schema.index({ location: '2d' });

module.exports = mongoose.model('Stop', schema);
