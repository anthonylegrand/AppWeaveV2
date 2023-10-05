require("dotenv").config();
const router = require("express").Router();
const path = require("path");

module.exports = function (app) {
  router.use((req, res, next) => {
    if (req.hostname === process.env.EXPRESS_HOSTNAME) next();
  });

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../public/index.html"));
  });

  router.get("/public/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../" + req.path));
  });

  app.use("/", router);
};
