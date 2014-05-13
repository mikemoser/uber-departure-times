define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/nextbus-tpl.html'),
      template        = _.template(tpl),
      events          = require('app/events');

  return Backbone.View.extend({
    initialize: function () {
      events.on('location.found', this.onLocationFound, this)
    },
    render: function () {
      this.$el.empty().html(template());
      return this;
    },
    onLocationFound: function (location) {
      this.location = location;
      this.render();
    }
  });
});