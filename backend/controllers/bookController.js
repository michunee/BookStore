const Book = require('../models/bookModel');

const getAllBook = async (req, res) => {
    const bookList = await Book.getAllBook();
    res.status(200).json({
        bookList: bookList
    })
}

const getBookByCategoryId = async (req, res) => {
    const catId = req.params.catId;
    const bookList = await Book.getBookByCategoryId(catId);
    res.status(200).json({
        bookList: bookList
    })
}

const getDetailBookById = async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.getDetailBookById(bookId);
    res.status(200).json({
        book: book
    })
}

module.exports = {
    getAllBook,
    getDetailBookById,
    getBookByCategoryId
}