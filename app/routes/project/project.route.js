const router = require("express").Router();
const controller = require("./../../controllers/project.controllers");

const {
  firebaseAuthenticate,
} = require("./../../middleware/firebaseAuth.middleware");

module.exports = function (app) {
  router.use(firebaseAuthenticate);

  router.post("/", controller.create);
  router.put("/:uuid", controller.update);
  router.get("/list", controller.list);
  router.get("/:uuid", controller.get);
  router.delete("/:uuid", controller.delete);
  router.put("/resetPrivate/:uuid", controller.resetPrivateKey);

  app.use("/project", router);
};
