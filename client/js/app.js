require.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app',
    tpl: '../app/tpl',
    views: '../app/views',
    models: '../app/models',
    services: '../app/services',
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['jquery', 'backbone', 'bootstrap', 'app/router', 'services/location'], function ($, Backbone, bootstrap, Router, locationService) {
  var router = new Router();
  Backbone.history.start();

  // Use the location service to find the users location
  locationService.requestLocation();
});