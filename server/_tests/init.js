'use strict'

var config = require('../config/env'),
    mongoose = require('mongoose');

// Connect to the test database
mongoose.connect(config.app.db)
