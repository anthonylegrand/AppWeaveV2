require("dotenv").config();
const router = require("express").Router();
const path = require("path");

const {
  firebaseAuthenticate,
} = require("./../../middleware/firebaseAuth.middleware");

const UUIDv4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

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

  router.get("/dashboard", [firebaseAuthenticate], (req, res) => {
    const projectUuid = req.query["projectUuid"];
    if (projectUuid && UUIDv4.test(projectUuid))
      res.sendFile(path.join(__dirname + "../../../../public/dashboard.html"));
    else res.redirect("/projects");
  });

  router.get("/public/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../../" + req.path));
  });

  app.use("/", router);
};
