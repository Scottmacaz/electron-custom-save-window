const fs = require('fs');

let fileLister = {
  listFiles: function (path, cb) {
    fs.readdir(path, function(err, items) {
      if (err) {
        cb(err);
      }
      console.log(items);
      const files = [];
      for (let i = 0; i < items.length; i++) {
          console.log(items[i]);
          files.push(items[i]);
      }
      cb(null, files);
  });
  }
};

module.exports = driveFinder;
