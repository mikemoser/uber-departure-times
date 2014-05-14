define(function (require) {

  var events = require('app/events'),
      _      = require('underscore');

  var LocationService = function () {
    
  }

  LocationService.prototype.requestLocation = function () {
    navigator.geolocation.getCurrentPosition(
      _.bind(this.onLocationFound, this),
      _.bind(this.onLocationError, this));
  }

  LocationService.prototype.onLocationFound = function (position) {
    events.trigger('location.found', {
      latitude:  position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy:  position.coords.accuracy
    });
  }

  LocationService.prototype.onLocationError = function (error) {
    events.trigger('location.error', error);
  }

  // Returns as a Singleton
  return new LocationService();
});