const express = require("express");
const router = express.Router();
const receiverController = require("../controllers/receiverController");
const protect = require("../middlewares/authorization");

router
  .route("/:username")
  .post(protect.verifyUser, receiverController.createReceiverbyUsername);

module.exports = router;
