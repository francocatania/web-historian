var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http'); //we may not need this
var fs = require('fs');
var url = require('url');

exports.handleRequest = function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  fs.readFile(path.join(__dirname, '/public/index.html'), null, function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    } else {
      var input = '';
      request.on('data', function(chunk) {
        input += chunk.toString();
        console.log(input.slice(4));
      });
      response.write(data);
    }
    response.end();
  });
};

//archive.paths.list