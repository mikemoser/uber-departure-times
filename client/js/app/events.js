define(function (require) {

  var Backbone = require('backbone'),
      _        = require('underscore')

  // Needs to return a singleton for all instances to share
  var events = _.extend({}, Backbone.Events);
  return events;
});
