const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');

const getAllBookPage = async (req, res) => {
    const bookList = await Book.getAllBooks();
    const categoryList = await Category.getAllCategorys();
    res.status(200).json({
        bookList : bookList,
        categoryList : categoryList
    })
}

const getBookByCategoryPage = async (req, res) => {
    const catId = req.params.catId;
    const bookList = await Book.getBookByCategory(catId);
    res.status(200).json({
        bookList : bookList
    })
}

module.exports = {
    getAllBookPage,
    getBookByCategoryPage
}