'use strict'

var Promise                = require('promise'),
    mongoose               = require('mongoose'),
    Models                 = require('../models'),
    serviceUtil            = require('./util'),
    util                   = require('util'),
    routesUrlTemplate      = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=%s',
    stopsUrlTemplate       = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=%s&r=%s',
    predictionsUrlTemplate = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=%s&r=%s&s=%s&useShortTitles=true'


module.exports.getPredictions = function (stop, direction) {
  var url = util.format(predictionsUrlTemplate, stop.agencyExternalId, stop.routeExternalId, stop.externalId);
  var predictions = [];
  
  return serviceUtil.requestXmlToJson(url)
  .then(function (response) {
    response.body.predictions.forEach(function (prediction) {
      prediction.direction[0].prediction.forEach(function (prediction) {
        predictions.push(prediction.$.minutes)
      });
    });

    return predictions;
  })
}

module.exports.loadData = function() {
  // TODO: Don't delete all data each time, do an upsert, we can really do something like this in PROD
  // TODO: Load more agencies, for now we are limited the app to SF Muni
  return clearData()
  .then(function () {
    return getRoutes('sf-muni')   
  })
  .then(function (routes) {
    return Promise.all(routes.map(getStops));
  })
  .then(function (results) {
    // Array of arrays is return, need to merge for bulk insert
    var merged = [];
    merged = merged.concat.apply(merged, results)

    // Bulk insert stops
    return Models.Stop.create(merged);
  });
}

function clearData() {
  return Promise.denodeify(Models.Stop.remove.bind(Models.Stop))();  
}

function getRoutes(agencyTag) {
  var url = util.format(routesUrlTemplate, agencyTag);
  var routeList = [];
    
  return serviceUtil.requestXmlToJson(url)
  .then(function (response) {
    // Parse to more consumable format
    response.body.route.forEach(function (route) {
      routeList.push({
        tag: route.$.tag, 
        agencyTag: agencyTag, // TODO: Use db driven agency
        title: route.$.title
      });
    });

    return routeList;
  })
}

function getStops(route) {
  var url = util.format(stopsUrlTemplate, route.agencyTag, route.tag);
  var stops = [];
  
  return serviceUtil.requestXmlToJson(url)
  .then(function (result) {
    // Use to look up the direction for each route, Nextbus result stores in 
    // seperate lookup array
    var directionHash = buildDirectionHash(result.body.route[0].direction);

    result.body.route[0].stop.forEach(function (stop) {
      var direction = directionHash[stop.$.tag];

      // Map to Stop Model 
      stops.push({
        externalId: stop.$.tag,
        name: stop.$.title,
        location: [parseFloat(stop.$.lon), parseFloat(stop.$.lat)],
        direction: direction ? direction : { name: 'End of line', description: 'End of line' }, //TODO: Is this really end of line?  They are missing directions for the last stops

        //Denormalized for search optimization
        routeName: route.title,
        routeExternalId: route.tag,
        agencyExternalId: route.agencyTag
      })
    });

    return stops;
  });
}

function buildDirectionHash(directions) {
  var hash = {};
  directions.forEach(function (direction) {
    var directionName = direction.$.name;
    var directionTitle = direction.$.title;

    // Map to Stop Model Definition for Direction
    direction.stop.forEach(function (stop) {
      hash[stop.$.tag] = {
        name: directionName,
        description: directionTitle
      }
    });
  });

  return hash;
}