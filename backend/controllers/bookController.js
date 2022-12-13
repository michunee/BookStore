const Book = require('../models/bookModel');

const getAllBook = async (req, res) => {
<<<<<<< HEAD
    const bookList = await Book.getAllBook();
    res.status(200).json({
        bookList : bookList
=======
    const bookList = await Book.getAllBook(req.query.page);
    res.status(200).json({
        bookList: bookList
>>>>>>> tin
    })
}

const getBookByCategoryId = async (req, res) => {
    const catId = req.params.catId;
    const bookList = await Book.getBookByCategoryId(catId);
    res.status(200).json({
<<<<<<< HEAD
        bookList : bookList
=======
        bookList: bookList
>>>>>>> tin
    })
}

const getDetailBookById = async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.getDetailBookById(bookId);
    res.status(200).json({
<<<<<<< HEAD
        book : book
=======
        book: book
>>>>>>> tin
    })
}

module.exports = {
    getAllBook,
    getDetailBookById,
    getBookByCategoryId
}