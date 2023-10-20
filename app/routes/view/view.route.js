const router = require("express").Router();
const controller = require("./../../controllers/view.controllers");

module.exports = function (app) {
  router.use((req, res, next) => {
    if (req.hostname === "localhost") next();
    else
      res
        .status(403)
        .send("Access forbidden: Requests from this domain are not allowed");
  });

  router.get("/", controller.defaultHTML);
  router.get("/:projectUuid", controller.projectHTML);

  app.use("/view", router);
};
