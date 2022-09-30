const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const protect = require("../middlewares/authorization");


router.route('/')
    .get(bookController.getAllBook);

router.route('/categories/:catId')
    .get(bookController.getBookByCategory);

router.route('/:bookId')
    .get(bookController.getDetailBookById);

module.exports = router;