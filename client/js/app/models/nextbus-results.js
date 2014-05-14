define(function (require) {
  var Backbone      = require('backbone'),
      NextbusResult = require('models/nextbus-result')

  return Backbone.Collection.extend({
    url: '/api/nextbus/search',
    model: NextbusResult    
  });
});