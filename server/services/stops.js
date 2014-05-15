'use strict'

var Models          = require('../models'),
    Promise         = require('promise'),
    NextbusService  = require('./nextbus')

module.exports.getPredictions = function (stopId) {
  var query = Models.Stop.findById(stopId); 
  return Promise.denodeify(query.exec.bind(query))()
  .then(function (stop) {
    // TODO: The Stop model is abstracted and not specific
    // to any one provider (e.g. Nextbus), so we should create
    // a dynamic provider pattern here.  For now we have one provider.
    switch (stop.provider) {
      case 'nextbus':
        return NextbusService.getPredictions(stop);
        break;
      default:
        throw new Error('Unknown stop provider.');  
    }
  }); 
}