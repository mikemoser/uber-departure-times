define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/location-tpl.html'),
      events          = require('app/events');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      events.on('location.found', this.onLocationFound, this);
      events.on('location.error', this.onLocationError, this);
    },
    render: function () {
      this.$el.empty().html(this.template({
        location: this.location,
        error: this.error
      }));

      return this;
    },
    onLocationFound: function (location) {
      this.location = location;
      this.render();
    },
    onLocationError: function (error) {
      this.error = error;
      this.render();
    }
  });
});