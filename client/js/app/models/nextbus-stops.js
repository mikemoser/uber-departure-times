define(function (require) {
  var Backbone      = require('backbone'),
      NextbusStop = require('models/nextbus-stop')

  return Backbone.Collection.extend({
    model : NextbusStop     
  });
});