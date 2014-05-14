'use strict'

var NextbusService = require('../../services/nextbus'),
    should         = require('should');

describe('Nextbus Service', function () {
  it.skip('should load data', function (done) {
    this.timeout(10000);
    
    NextbusService.loadData()
    .then(function () {
      // TODO: Mock external services (e.g. Nextbus, Mongo)
      // TODO: Check for success criteria
      done();
    }, function (error) {
      should.not.exist(error);
      done();
    })
    .done();
  });
});