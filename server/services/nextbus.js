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
  var url = util.format(predictionsUrlTemplate, stop.providerData.agencyTag, stop.providerData.routeTag, stop.providerData.stopTag);
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
        name: stop.$.title,
        location: [parseFloat(stop.$.lon), parseFloat(stop.$.lat)],
        direction: direction ? direction : 'End of line',  // TODO: Need to research why some stop do not have a direction, seem to be last stop, so perhaps end of the line
        
        //Denormalized for search optimization
        routeName: route.title,

        // Provider specific data so the base Stop model can be abstract
        provider: 'nextbus',
        providerData: {
          agencyTag: route.agencyTag,
          routeTag: route.tag,
          stopTag: stop.$.tag,
        }
      })
    });

    return stops;
  });
}

function buildDirectionHash(directions) {
  var hash = {};
  directions.forEach(function (direction) {
    var directionTitle = direction.$.title;

    direction.stop.forEach(function (stop) {
      hash[stop.$.tag] = directionTitle;
    });
  });

  return hash;
}