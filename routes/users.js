const router = require("express").Router();
const passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const db = require("../models");

router.route("/api/signup").post(usersController.createUser);

router.post(
  "/api/login",
  passport.authenticate("local"),
  usersController.findOne
);

router.route("/api/saved").post(usersController.saveSong);
router.route("/api/saved").get(usersController.findAllSaved);
router.route("/api/savedsongs/:id").get(usersController.findSavedById);
router.route("/api/savedsongs/:id").delete(usersController.deleteById);
module.exports = router;
