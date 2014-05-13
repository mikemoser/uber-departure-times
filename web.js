'use strick'

var config    = require('./server/config/env'),
    express   = require('express'),
    app       = express();

// Client Routes
app.get('/', function(req, res){
  res.sendfile(__dirname + '/client/index.html');
});

// Static Routes
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));

// Start web server
var server = app.listen(config.app.port, function () {
  console.log('Listening on port ' + config.app.port);
});
