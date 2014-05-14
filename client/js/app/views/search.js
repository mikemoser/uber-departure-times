define(function (require) {

  var Backbone          = require('backbone'),
      tpl               = require('text!tpl/search-tpl.html'),
      events            = require('app/events'),
      SearchResults     = require('models/search-results'),
      SearchResultView  = require('views/search-result')

  return Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
      this.searchResults = new SearchResults();
      this.searchResults.on('reset', this.render, this);
      events.on('location.found', this.onLocationFound, this);
    },
    render: function () {
      this.$el.empty().html(this.template());

      // Add subview for each result
      this.searchResults.each(function (result) {
        this.$el.append(new SearchResultView({ model: result }).render().el)
      }, this);

      return this;
    },
    onLocationFound: function (location) {
      this.location = location;

      this.searchResults.fetch({
        reset:true,
        data: $.param({ // Pass the location on the query string as search criteria
          longitude: this.location.longitude,
          latitude: this.location.latitude
        })
      });
    }
  });
});