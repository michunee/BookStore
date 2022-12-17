const express = require("express");
const router = express.Router();
const receiverController = require("../controllers/receiverController");

router.route("/cart/:cartId").get(receiverController.getReceiverbyCartId);

router.route("/:username").post(receiverController.createReceiverbyUsername);

module.exports = router;
