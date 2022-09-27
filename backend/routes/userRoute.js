const {
  getAllUser,
  getUserByUsername,
} = require("../controllers/userController");
const { login, register } = require("../controllers/authController");
const { verifyUser, verifyAdmin } = require("../middlewares/authorization");
const router = require("express").Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/").get(verifyAdmin, getAllUser);

router.route("/:username").get(verifyAdmin, getUserByUsername);

module.exports = router;
