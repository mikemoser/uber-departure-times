(function (undefined) {
  'use strict'

  var mongoose       = require('mongoose'),
      config         = require('./config/env'),
      Services       = require('./services');

  mongoose.connect(config.app.db)

  console.log('Start loading data...');
  Services.Nextbus.loadData()
  .then(function () {
    console.log('Nextbus data loaded.');
    mongoose.disconnect();
  })
  .done();

})();
