const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.route("/").get(bookController.getAllBook);

router.route("/category/:catId").get(bookController.getBookByCategoryId);

router.route("/:bookId").get(bookController.getDetailBookById);

router
  .route("/avg-rating/:bookId")
  .get(bookController.getAverageRatingBookById);

module.exports = router;
