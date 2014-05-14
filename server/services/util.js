'use strict'

var xml2js  = require('xml2js');
var http    = require('http');
var Promise = require('promise');

module.exports.requestXmlToJson = function (url) {
  return new Promise(function (resolve, reject) {  
    http.get(url, function(response) {
      var xml = '';

      response.on('data', function (chunk) {
        xml += chunk;
      });

      response.on('end', function () {
        xml2js.parseString(xml, function (err, result) {
          resolve(result);
        });
      });

      response.on('error', function (error) {
        reject(error);
      });
    }).end();
  });
}
 