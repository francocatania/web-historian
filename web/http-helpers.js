var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  response.writeHead(200, {'Content-Type': 'text/html'});

  
  fs.readFile(asset, null, function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
};



// As you progress, keep thinking about what helper functions you can put here!
