'use strict'

var Models          = require('../models'),
    Promise         = require('promise'),
    NextbusService  = require('./nextbus')

module.exports.getPredictions = function (stopId) {
  var query = Models.Stop.findById(stopId); 
  return Promise.denodeify(query.exec.bind(query))()
  .then(function (stop) {
    // TODO: Since we've attempted to keep the Stop model
    // abstract and not specific to Nextbus, we should really
    // use a provider pattern to do provider specific lookups 
    // and tasks.  However for V1 we will just hard code a call
    // to the Nextbus server and assume that all stops are Nextbus
    // stops.
    return NextbusService.getPredictions(stop);
  }) 
}