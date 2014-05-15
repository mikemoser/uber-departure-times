'use strict'

var Services = require('../services')

module.exports.predictions = function (req, res) {
  Services.Stops.getPredictions(req.params.id)
  .then(function (results) {
    res.json(results);  
  }, function (error) {
    res.status(500);
    next(error);
  });
}