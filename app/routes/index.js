const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  getAllJsFiles(path.join(__dirname));

  function getAllJsFiles(fullPath, getSubFolders = true) {
    const files = fs.readdirSync(fullPath);
    files.map((file) => {
      if (getSubFolders && !file.includes("."))
        getAllJsFiles(path.join(fullPath, file), false);
      else if (!getSubFolders && file.includes(".js"))
        require(path.join(fullPath, file))(app);
    });
  }
};
