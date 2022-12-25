const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const protect = require("../middlewares/authorization");

router.route("/").get(paypalController.createPayment);

router.route("/return/success").get(paypalController.successPayment);

router.route("/return/cancel").get(paypalController.cancelPayment);

module.exports = router;
