(function (undefined) {
  'use strict'

  var mongoose       = require('mongoose'),
      config         = require('./config/env'),
      NextbusService = require('./services/nextbus');

  mongoose.connect(config.app.db)

  console.log('Start loading data...');
  NextbusService.loadData()
  .then(function () {
    console.log('Nextbus data loaded.');
    mongoose.disconnect();
  })
  .done();

})();
