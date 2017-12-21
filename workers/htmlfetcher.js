var archiveHelpers = require('../helpers/archive-helpers');

exports.htmlDownloader = function() {
  
  archiveHelpers.readListOfUrls(function(websitesArray) {
    let toDownload = [];

    for (let i = 0; i < websitesArray.length; i++) {
      archiveHelpers.isUrlArchived(websitesArray[i], function(isArchived) {
        if (!isArchived) {
          toDownload.push(websitesArray[i]);
          archiveHelpers.downloadUrls(toDownload);
        }
      });
    }
    

  });

};






