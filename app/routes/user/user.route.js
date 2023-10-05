const router = require("express").Router();
const controller = require("./../../controllers/user.controllers");

const {
  firebaseAuthenticate,
} = require("./../../middleware/firebaseAuth.middleware");

module.exports = function (app) {
  router.use(firebaseAuthenticate);

  router.get("/logout", controller.logout);
  router.get("/profil", controller.getProfil);

  app.use("/user", router);
};
