define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/location-tpl.html'),
      events          = require('app/events');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      events.on('location.found', this.onLocationFound, this);
    },
    render: function () {
      this.$el.empty().html(this.template({
        location: this.location
      }));

      return this;
    },
    onLocationFound: function (location){
      this.location = location;
      this.render();
    }
  });
});