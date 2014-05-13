define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/rides-tpl.html'),
      template        = _.template(tpl),
      LocationView    = require('views/location-view'),
      locationView    = new LocationView(),
      NextBusView     = require('views/nextbus-view'),
      nextbusView     = new NextBusView()

  return Backbone.View.extend({
    initialize: function () {

    },
    render: function () {
      this.$el.empty().html(template());

      this.assign({
        '.location-view': locationView,
        '.nextbus-view': nextbusView
      });

      return this;
    },
    // Credit to: Ian Storm Taylor 
    // http://ianstormtaylor.com/assigning-backbone-subviews-made-even-cleaner/
    // Clean way to manage sub-view layouts withour rebuilding views and loosing events
    assign : function (selector, view) {  
      var selectors;
      if (_.isObject(selector)) {
        selectors = selector;
      }
      else {
        selectors = {};
        selectors[selector] = view;
      }

      if (!selectors) return;
      _.each(selectors, function (view, selector) {
        view.setElement(this.$(selector)).render();
      }, this);
    }
  });
});