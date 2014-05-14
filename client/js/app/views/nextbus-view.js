define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/nextbus-tpl.html'),
      template        = _.template(tpl),
      events          = require('app/events'),
      NextbusResults  = require('models/nextbus-results-collection');

  return Backbone.View.extend({
    initialize: function () {
      this.nextbusResults = new NextbusResults();
      this.nextbusResults.on('reset', this.render, this);
      events.on('location.found', this.onLocationFound, this);
    },
    render: function () {
      this.$el.empty().html(template({
        results: this.nextbusResults.toJSON()
      }));
      return this;
    },
    onLocationFound: function (location) {
      this.location = location;

      this.nextbusResults.fetch({
        reset:true,
        data: $.param({ // Pass the location on the query string as search criteria
          longitude: this.location.longitude,
          latitude: this.location.latitude
        })
      });
    }
  });
});