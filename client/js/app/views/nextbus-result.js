define(function (render) {

  var Backbone         = require('backbone'),
      tpl              = require('text!tpl/nextbus-result-tpl.html'),
      NextbusStopView  = require('views/nextbus-stop'),
      NextbusStop      = require('models/nextbus-stop');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
    },
    render: function () {
      this.$el.empty().html(this.template(this.model.attributes));

      _.each(this.model.attributes.stops, function (stop) {
        // TODO: Find a better approach for nested Backbone models, there is not a built in solution
        // Create a Backbone model for each stop 
        var nextbusStop = new NextbusStop(stop);

        // Create add a sub view for each stop
        this.$('.stops').append(new NextbusStopView({ model: nextbusStop }).render().el)

      }, this);

      return this;
    }
  });
});