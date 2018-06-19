// https://code-maven.com/list-content-of-directory-with-nodejs
const fs = require('fs');

let fileLister = {
  listFiles: function (path, cb) {
    debugger;
    fs.readdir(path, function (err, files) {
      if (err) {
        cb({ hasError: true, error: err });
        return;
      }

      // files.forEach((file) => {
      //   const file_1 = file;
      //    fs.stat(path + '\\' + file_1, function(statErr, stats) {
      //      // ignore stat errors for now.
      //      if (!statErr) {
      //        console.log('push file: ' + file_1);
      //        rsp.push({ file: file_1, isDir: stats.isDirectory() });
      //      }
      //    });
      // });

      const rsp = [];
      files.forEach((file) => {

        try {
          const stats = fs.statSync(path + '\\' + file);
          console.log('push file: ' + file);
          if (! /^\..*/.test(file)) { // ignore hidden files
            rsp.push({ file: file, isDir: stats.isDirectory() });
          }
        } catch (e) {
          console.log('Caught e' + e);
        }
      });
      cb(null, { 'hasError': false, 'files': rsp });
    });
  }
};

module.exports = fileLister;
