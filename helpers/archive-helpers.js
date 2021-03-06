var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else {
      var websites = data.split('\n');
      //console.log(websites);
      callback(websites);
    }
  });
};

exports.isUrlInList = function(url, callback) { 
  exports.readListOfUrls(function(websites) {
    callback(websites.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n');
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    console.log(url);
    var formattedUrl = url.replace(/\./g, '-') + '.html';
    callback(files.includes(formattedUrl), formattedUrl);
  });
};

exports.downloadUrl = function(url) { // -> takes array of urls
  request('http://' + url, function(error, response, body) { // -> make a request for html of the element in the array
    if (error) {
      console.log('There is an error');
    }
    var cleanUrl = url.replace(/\./g, '-');
    fs.writeFile(path.join(exports.paths.archivedSites, '/' + cleanUrl + '.html'), body); // -> write the file to the archive
  });
};



