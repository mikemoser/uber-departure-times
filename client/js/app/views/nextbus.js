define(function (require) {

  var Backbone          = require('backbone'),
      tpl               = require('text!tpl/nextbus-tpl.html'),
      events            = require('app/events'),
      NextbusResults    = require('models/nextbus-results'),
      NextbusResultView = require('views/nextbus-result')

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      this.nextbusResults = new NextbusResults();
      this.nextbusResults.on('reset', this.render, this);
      events.on('location.found', this.onLocationFound, this);
    },
    render: function () {
      this.$el.empty().html(this.template());

      // Add subview for each result
      this.nextbusResults.each(function (result) {
        this.$el.append(new NextbusResultView({ model: result }).render().el)
      }, this);

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