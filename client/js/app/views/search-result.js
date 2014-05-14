define(function (render) {

  var Backbone         = require('backbone'),
      tpl              = require('text!tpl/search-result-tpl.html'),
      StopView         = require('views/stop'),
      Stop             = require('models/stop');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
    },
    render: function () {
      this.$el.empty().html(this.template(this.model.attributes));

      _.each(this.model.attributes.directions, function (direction) {

          // Only add the first & closest (assume sort) stop from each location
          if (direction.stops[0]) {

            // TODO: Find a better approach for nested Backbone models, there is not a built in solution
            var stop = new Stop(direction.stops[0]); 

            // Add a sub view for each stop
            this.$('.stops').append(new StopView({ model: stop }).render().el)
          }

      }, this);

      return this;
    }
  });
});