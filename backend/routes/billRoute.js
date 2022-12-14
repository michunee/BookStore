const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const protect = require("../middlewares/authorization");

router
  .route("/:username")
  .get(protect.verifyUser, billController.getBillByUsername)
  .post(billController.createBill);

router
  .route("/detail/:billId")
  .get(protect.verifyUser, billController.getBillByBillId);

module.exports = router;
