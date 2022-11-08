const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/')
    .get(commentController.getAllComment);

router.route('/book/:bookId')
    .get(commentController.getCommentByBookId);

router.route('/user/:username/book/:bookId')
    .post(commentController.postCommentbyUsername);

module.exports = router;