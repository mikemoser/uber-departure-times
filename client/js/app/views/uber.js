define(function (require) {
  var Backbone  = require('backbone'),
      tpl       = require('text!tpl/uber-tpl.html'),
      events    = require('app/events');

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      events.on('location.found', this.onLocationFound, this);
    },
    render: function () {
      this.$el.empty().html(this.template({location: this.location, estimatedTime: this.estimatedTime }));
      return this;
    },
    events: {
      'click .uber-button': 'requestUber'
    },
    onLocationFound: function (location) {
      this.location = location;

      // TODO: Get realtime data from Uber API
      // just need access to the API :)~
      this.estimatedTime = 5;

      this.render();
    },
    requestUber: function () {
      // HACK:  Quick and dirty way to try and optimize for moblie.  Ideally would implement an
      // intent workflow and launch the app automatically on iOS and Android (e.g. uber://),
      // for now, we will just send the user to the moble version of uber's site that does
      // some detection if the app is installed or allows them to sign up.
      if (screen.width < 480) 
        window.location.href = 'http://m.uber.com';
      else
        window.location.href = 'http://uber.com'
    }
  });
});