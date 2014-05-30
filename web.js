'use strict'

var config      = require('./server/config/env'),
    express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    favicon     = require('serve-favicon'),
    Controllers = require('./server/controllers');

// Connect to MongoDb
mongoose.connect(config.app.db);

// Client Routes
app.get('/', function(req, res){
  res.sendfile(__dirname + '/client/index.html');
});

// Static Routes
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use(favicon(__dirname + '/client/img/favicon.ico'))

// API Routes
app.get('/api/search', Controllers.Search.search)
app.get('/api/stops/:id/predictions', Controllers.Stops.predictions)

// Start web server
var server = app.listen(process.env.PORT || config.app.port, function () {
  console.log('Listening on port ' + config.app.port);
});
