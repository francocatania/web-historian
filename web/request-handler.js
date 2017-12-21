var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http'); //we may not need this
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers');
var archiveHelpers = require('../helpers/archive-helpers');


exports.handleRequest = function (request, response) {
  
  httpHelpers.serveAssets(response, path.join(__dirname, '/public/index.html')); // renders index.html when the page is first loaded
  

  // if (request.method === 'POST') {
  //   console.log('this url is making a POST request', request.url);
  //   // archiveHelpers.readListOfUrls();
  //   archiveHelpers.readListOfUrls();
  // }

  var input = '';
  request.on('data', function(chunk) {
    input += chunk.toString();
    var website = input.slice(4);

    if (website) {
      console.log(website);
      archiveHelpers.readListOfUrls();
    }

    // if (weHaveHTML(website)) {
    //   //serve that HTML
    // } else {
    //   httpHelpers.serveAssets(response, path.join(__dirname, '/public/loading.html'));
    // }
  });

};

//archive.paths.list