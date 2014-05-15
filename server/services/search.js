'use strict'

var Promise   = require('promise'),
    Models    = require('../models'),
    config    = require('../config/env');

module.exports.findNearByStops = function (longitude, latitude) {
  var query = Models.Stop.aggregate([
    { 
      $geoNear: { 
        near: [
          parseFloat(longitude), 
          parseFloat(latitude)
        ], 
        distanceField: "dist.calculated", 
        maxDistance: config.maxDistance,
        includeLocs: "dist.location" 
      }
    },
    {
      $group: { 
        _id :  {
          routeName: "$routeName",
          direction: "$direction"
        }, 
        stops: { 
          $push: { 
            _id: "$_id",
            name: "$name",
            direction: "$direction",
            dist: "$dist" 
          } 
        } 
      }
    },
    {
      $group: {
        _id: {
          routeName: "$_id.routeName"
        },
        directions: {
          $push: {
            description: "$_id.direction",
            stops: "$stops"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        routeName: "$_id.routeName",
        directions: 1
      }
    },
    {
      $sort: {
        "directions.stops.dist.calculated": 1
      }
    },
    {
      $limit: config.app.search.limit
    }
  ]);

  return Promise.denodeify(query.exec.bind(query))();
}