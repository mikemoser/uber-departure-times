define(function (render) {

  var Backbone  = require('backbone')
      tpl       = require('text!tpl/nextbus-stop-tpl.html');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
    },
    render: function () {
      this.$el.empty().html(this.template(this.model.attributes));
      return this;
    }
  });
});