define(function (render) {

  var Backbone  = require('backbone')
      tpl       = require('text!tpl/stop-tpl.html');

  return Backbone.View.extend({
    tagName: 'li',
    className: 'stop-view',
    initialize: function () {
      this.template = _.template(tpl);
      this.model.on('change', this.render, this);
    },
    render: function () {
      this.$el.empty().html(this.template(this.model.attributes));
      return this;
    }
  });
});