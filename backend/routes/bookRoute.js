const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/')
    .get(bookController.getAllBook);

router.route('/categories/:catId')
    .get(bookController.getBookByCategory);

module.exports = router;