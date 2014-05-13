define(function (require) {
  
  var Backbone    = require('backbone'),
      $           = require('jquery'),
      $content    = $('#content'),
      RidesView   = require('views/rides-view'),
      ridesView   = new RidesView({ el: $content });

  return Backbone.Router.extend({
    initialize: function () {

    },
    routes: {
      '' : 'rides'
    },
    rides: function () {
      ridesView.render();
    }
  });
});