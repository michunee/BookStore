const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const protect = require("../middlewares/authorization");

router.route("/").post(protect.verifyAdmin, authController.createAdmin);

module.exports = router;
