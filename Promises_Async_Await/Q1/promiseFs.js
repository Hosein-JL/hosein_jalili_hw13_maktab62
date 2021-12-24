const fs = require("fs");
const path = require("path");

function promiseAccess(fileName) {
  return new Promise(function (resolve, reject) {
    fs.access(path.join(__dirname, fileName), function (err) {
      if (err) reject("Not found!");
      else resolve("ok");
    });
  });
}

function promiseReadFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, fileName), "utf-8", function (err, data) {
      if (err) {
        reject("Can't read file");
      } else {
        resolve(data);
      }
    });
  });
}

function promiseWrite(fileName, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.join(__dirname, fileName), data, "utf-8", (err) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = {
  promiseAccess,
  promiseReadFile,
  promiseWrite,
};
