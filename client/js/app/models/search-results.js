define(function (require) {
  var Backbone      = require('backbone'),
      SearchResult  = require('models/search-result')

  return Backbone.Collection.extend({
    url: '/api/search',
    model: SearchResult    
  });
});