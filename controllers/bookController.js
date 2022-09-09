const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');

const getAllBookPage = async (req, res) => {
    const bookList = await Book.getAllBooks();
    const categoryList = await Category.getAllCategorys();
    bookList.forEach(book => {
        delete book.bookDes;
    });
    res.status(200).json({
        bookList: bookList,
        categoryList: categoryList
    })
}

module.exports = {
    getAllBookPage
}