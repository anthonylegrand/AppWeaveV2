const router = require("express").Router();

module.exports = function (app) {
  router.get("/ping", (req, res) => res.status(200).json({ ping: "pong" }));

  app.use("/kuma", router);
};
