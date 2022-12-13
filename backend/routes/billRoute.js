const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router
<<<<<<< HEAD
  .route("/:username")
  .get(billController.getBillByUsername)
  .post(billController.createBill);

module.exports = router;
=======
    .route("/:username")
    .get(billController.getBillByUsername)
    .post(billController.createBill);

module.exports = router;
>>>>>>> tin
