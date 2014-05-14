define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/home-tpl.html'),
      LocationView    = require('views/location'),
      NextBusView     = require('views/nextbus');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      this.locationView = new LocationView();
      this.nextbusView = new NextBusView();
    },
    render: function () {
      this.$el.empty().html(this.template());

      this.assign({
        '.location-view': this.locationView,
        '.nextbus-view': this.nextbusView
      });

      return this;
    },
    assign: assign
  });

  // Credit to: Ian Storm Taylor 
  // http://ianstormtaylor.com/assigning-backbone-subviews-made-even-cleaner/
  // Clean way to manage sub-view layouts withour rebuilding views and loosing events
  function assign(selector, view) {  
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