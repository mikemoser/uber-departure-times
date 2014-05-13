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
    }
  }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
  var router = new Router();
  Backbone.history.start();
});