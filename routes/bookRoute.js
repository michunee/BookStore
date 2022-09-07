const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/').get(bookController.getAllBookPage);

module.exports = router;