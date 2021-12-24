const fs = require("fs");
const path = require("path");

function promiseAccess(filename) {
  return new Promise(function (resolve, reject) {
    fs.access(path.join(__dirname, filename), function (err) {
      if (err) reject("not found");
      else resolve("ok");
    });
  });
}

function promiseReadFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, filename), "utf-8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function promiseWrite(filename, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.join(__dirname, filename), data, "utf-8", (err) => {
      if (err) reject(err);
      else resolve("ok");
    });
  });
}

module.exports = {
  promiseAccess,
  promiseReadFile,
  promiseWrite,
};
