define(function (require) {

  var Backbone        = require('backbone'),
      tpl             = require('text!tpl/location-tpl.html'),
      template        = _.template(tpl)

  return Backbone.View.extend({
    initialize: function () {

    },
    render: function () {
      this.$el.empty().html(template());
      return this;
    }
  });
});