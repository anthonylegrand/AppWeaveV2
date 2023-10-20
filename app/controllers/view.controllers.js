require("dotenv").config();
const path = require("path");
const fs = require("fs");

const defaultPath = path.join(__dirname + "../../../public");
const UUIDv4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

module.exports.defaultHTML = async (req, res) => {
  res.sendFile(path.join(defaultPath, "/defaultView.html"));
};

module.exports.projectHTML = async (req, res) => {
  const projectUuid = req.params["projectUuid"];
  if (projectUuid && !UUIDv4.test(projectUuid))
    return res
      .status(403)
      .send("Access forbidden: Requests from this domain are not allowed");

  const projectPath = path.join(
    defaultPath,
    "../ProjectsViews/" + projectUuid + "/index.html"
  );

  if (fs.existsSync(projectPath)) res.sendFile(projectPath);
  else res.sendFile(path.join(defaultPath, "/defaultView.html"));
};
