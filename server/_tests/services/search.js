'use strict'

var Services = require('../../services');

describe('Search Service', function () {
  var longitude = -122.42531310000001,
      latitude  = 37.7534834;

  it('should find near by stops', function (done) {  
    Services.Search.findNearByStops(longitude, latitude)
    .then(function (results) {
      // TODO: Test for expected results
      done();
    }, function (error) {
      should.not.exist(error);
      done();
    })
    .done();
  });
});