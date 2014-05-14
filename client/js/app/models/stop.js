define(function (require) {
  var Backbone = require('backbone'),
      $        = require('jquery');

  return Backbone.Model.extend({
    defaults: {
      predictions: []
    },
    initialize: function () {
      // TODO: Setup polling or count down
      this.getPredictions();
    },
    getPredictions: function () {
      var self = this;

      $.get('/api/stops/' + self.id + '/predictions')
      .done(function (predictions) {
        self.set('predictions', predictions);
      });
    }
  });
});