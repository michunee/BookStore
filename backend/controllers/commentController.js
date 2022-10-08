const Comment = require('../models/commentModel');

const getAllComment = async (req, res) => {
    const commentList = await Comment.getAllComment();
    res.status(200).json({
        commentList : commentList
    })
}

const getCommentByBookId = async(req, res) => {
    const bookId = req.params.bookId;
    const commentList = await Comment.getCommentByBookId(bookId);
    res.status(200).json({
        commentList : commentList
    })

}

module.exports = {
    getAllComment,
    getCommentByBookId
}