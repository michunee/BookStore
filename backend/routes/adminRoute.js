const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const protect = require("../middlewares/authorization");

router
  .route("/")
  .get(protect.verifyAdmin, adminController.getAllAdmin)
  .post(protect.verifyAdmin, authController.createAdmin);

module.exports = router;
