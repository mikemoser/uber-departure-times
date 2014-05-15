'use strict'

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,                 
  location: [],
  direction: String,

  // To keep the model abstract and open to add stops from 
  // other providers (e.g. BART) the specific provider data
  // (e.g. Nextbus agengyTag, routeTag, stopTag) as stored
  // the the provider data.
  provider: { type: String, enum: ['nextbus'] },
  providerData: {},                           

  // Denormalize for effecient search and aggregation
  routeName: String          
});

// Ensure 2D index on location for geo queries
schema.index({ location: '2d' });

module.exports = mongoose.model('Stop', schema);
