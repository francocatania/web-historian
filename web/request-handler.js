var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http'); //we may not need this
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers');
var archiveHelpers = require('../helpers/archive-helpers');

var parseInput = function(request, callback) {
  var input = '';
  request.on('data', function(chunk) {
    input += chunk.toString();
    var website = input.slice(4);
    callback(website);
  });
};


exports.handleRequest = function (request, response) {
  if (request.method === 'GET' && request.url === '/') {
    httpHelpers.serveAssets(response, path.join(__dirname, '/public/index.html'));
  }
  if (request.method === 'GET' && request.url === '/styles.css') {
    httpHelpers.serveAssets(response, path.join(__dirname, '/public/styles.css')); 
  }

  if (request.method === 'POST') {
    parseInput(request, function(website) {
      archiveHelpers.isUrlInList(website, function(isInList) {
        if (isInList) { //&& isInArchive
          //clean website (so that www. & .com are removed)
          httpHelpers.serveAssets(response, path.join(archiveHelpers.paths.archivedSites, '/google.html'));
        // } else if (isInList) {
        //   httpHelpers.serveAssets(response, path.join(__dirname, '/public/loading.html'));
        } else {
          httpHelpers.serveAssets(response, path.join(__dirname, '/public/loading.html'));
          archiveHelpers.addUrlToList(website);
        }
      });
    });
  } 
  //   else {
  //   response.writeHead(404);
  //   response.write('File not found!');
  //   response.end();
  // }
};
