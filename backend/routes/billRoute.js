const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router
  .route("/:username")
  .get(billController.getBillByUsername)
  .post(billController.createBill);

module.exports = router;
