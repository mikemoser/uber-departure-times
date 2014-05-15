'use strict'

var Services = require('../services');

module.exports.search = function (req, res) {
  // TODO: Verify input (e.g. req.query.latitude & longitude)
  // or support other type of filters
  Services.Search.findNearByStops(req.query.longitude, req.query.latitude)
  .then(function (results) {
    res.json(results);  
  }, function (error) {
    res.status(500);
    next(error);
  });
}