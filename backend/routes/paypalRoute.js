const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const protect = require("../middlewares/authorization");

router.route("/").get(protect.verifyUser, paypalController.createPayment);

router
  .route("/return/success")
  .get(protect.verifyUser, paypalController.successPayment);

router
  .route("/return/cancel")
  .get(protect.verifyUser, paypalController.cancelPayment);

module.exports = router;
