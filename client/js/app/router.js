define(function (require) {
  
  var Backbone    = require('backbone'),
      $           = require('jquery'),
      $content    = $('#content'),
      HomeView   = require('views/home'),
      homeView   = new HomeView({ el: $content });

  return Backbone.Router.extend({
    initialize: function () {

    },
    routes: {
      '' : 'home'
    },
    home: function () {
      homeView.render();
    }
  });
});