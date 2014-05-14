'use strict'

var SearchService = require('../services/search');

module.exports.search = function (req, res) {
  // TODO: Verify input (e.g. req.query.latitude & longitude)
  // or support other type of filters
  SearchService.findNearByStops(req.query.longitude, req.query.latitude)
  .then(function (results) {
    res.json(results);  
  }, function (error) {
    res.status(500);
    next(error);
  });
}