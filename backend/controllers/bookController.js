const Book = require("../models/bookModel");

const getAllBook = async (req, res) => {
  const bookList = await Book.getAllBook(req.query.page);
  res.status(200).json({
    bookList: bookList,
  });
};

const getBookByCategoryId = async (req, res) => {
  const catId = req.params.catId;
  const bookList = await Book.getBookByCategoryId(catId);
  res.status(200).json({
    bookList: bookList,
  });
};

const getDetailBookById = async (req, res) => {
  const bookId = req.params.bookId;
  const book = await Book.getDetailBookById(bookId);
  res.status(200).json({
    book: book,
  });
};

const getAverageRatingBookById = async (req, res) => {
  const bookId = req.params.bookId;
  const data = await Book.getAverageRatingBook(bookId);
  res.status(200).json({
    data,
  });
};

module.exports = {
  getAllBook,
  getDetailBookById,
  getBookByCategoryId,
  getAverageRatingBookById,
};
