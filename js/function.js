const fs = require("fs");
const path = require("path");

const singleImage = function (loc) {
  return (
    "data:image/png;base64," +
    fs.readFileSync(path.join(__dirname, "../", loc), "base64")
  );
};

const multipleImage = function (dir) {
  return new Promise((resolve, reject) => {
    var loc = path.join(__dirname, "../", dir);
    fs.readdir(loc, function (err, files) {
      if (err) reject(err);
      var obj = [];
      files.forEach(function (file) {
        obj.push(
          "data:image/png;base64," +
            fs.readFileSync(path.join(loc, file), "base64")
        );
      });
      resolve(obj);
    });
  });
};

module.exports.singleImage = singleImage;
module.exports.multipleImage = multipleImage;
