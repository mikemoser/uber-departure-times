'use strict'

var Promise   = require('promise'),
    Models    = require('../models'),
    config    = require('../config/env');

module.exports.findNearByStops = function (longitude, latitude) {
  var query = Models.Stop.aggregate([
    // Find all stops near by
    { 
      $geoNear: { 
        near: [
          parseFloat(longitude), 
          parseFloat(latitude)
        ], 
        distanceField: "dist.calculated",
        spherical: true, 
        distanceMultiplier: 3963.192, // Convert dist.calculated to miles
        maxDistance: config.maxDistance,
        includeLocs: "dist.location" 
      }
    },
    // Group by route name and direction first
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
    // Sort by direction so Inbound and Outbound are returned in same order
    {
      $sort: {
        "_id.direction": 1
      }
    },
    // Group again by just route  so we hve a list of nearby routes 
    // the availabile directions (inbount/outbound) for each route 
    // and this of stops ordered by closest to furthest away
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
    // Clean up the search result output
    {
      $project: {
        _id: 0,
        routeName: "$_id.routeName",
        directions: 1
      }
    },
    // Ensure the routes with the closest stops are sorted first in the 
    // over all list.  Grouping does not maintain order of grouped items
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