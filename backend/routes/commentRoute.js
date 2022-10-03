const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/')
    .get(commentController.getAllComment);

router.route('/book/:bookId')
    .get(commentController.getCommentByBook);

module.exports = router;