// https://code-maven.com/list-content-of-directory-with-nodejs
const fs = require('fs');

let fileLister = {
  listFiles: function(path, cb) {
    const files = fs.readdirSync(path);

    const rsp = [];
    files.forEach(function(file) {
      const stats = fs.statSync(path + '\\' + file);
      rsp.push({ file: file, isDir: stats.isDirectory() });
    });
    cb(null, rsp);
  }
};

module.exports = fileLister;
