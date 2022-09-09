const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/').get(bookController.getAllBookPage);

router.route('/:catId').get(bookController.getBookByCategoryPage);

module.exports = router;