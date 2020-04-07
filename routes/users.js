const router = require("express").Router();

const usersController = require("../controllers/usersController");

router.route("/api/signup").post(usersController.createUser);

module.exports = router;
