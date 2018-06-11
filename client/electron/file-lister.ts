// https://code-maven.com/list-content-of-directory-with-nodejs
const fs = require('fs');

let fileLister = {
  listFiles: function(path, cb) {
    fs.readdir(path, function(err, files) {
      if (err) {
        cb({ hasError: true, error: err });
        return;
      }
      const rsp = [];
      files.forEach((file) => {
        fs.stat(path + '\\' + file, function(statErr, stats) {
          // ignore stat errors for now.
          if (!statErr) {
            console.log('push file: ' + file);
            rsp.push({ file: file, isDir: stats.isDirectory() });
          }
        }(rsp));
      });
      cb(null, { hasError: false, files: rsp });
    });
  }
};

module.exports = fileLister;
