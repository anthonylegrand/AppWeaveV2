require("dotenv").config();
const router = require("express").Router();
const path = require("path");

const {
  firebaseAuthenticate,
} = require("./../../middleware/firebaseAuth.middleware");

module.exports = function (app) {
  router.use((req, res, next) => {
    if (req.hostname === process.env.EXPRESS_HOSTNAME) next();
  });

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../public/index.html"));
  });

  router.get("/projects", [firebaseAuthenticate], (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../public/projects.html"));
  });

  router.get("/public/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../" + req.path));
  });

  app.use("/", router);
};
