const db = require('./database');

<<<<<<< HEAD
exports.getAllBook = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT bookId, bookName, bookImg, bookPrice, enable FROM book";
=======
exports.getAllBook = async (page) => {
    return new Promise((resolve, reject) => {
        if (page == null) {
            let sql = "SELECT * FROM book";
            db.query(sql, (err, data) => {
                if (err) console.log(err);
                else resolve(data);
            })
        }
        let sql = "SELECT bookId, bookName, bookImg, bookPrice, enable FROM book LIMIT " + 12
            + " OFFSET " + 12 * (page - 1);
>>>>>>> tin
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

<<<<<<< HEAD
exports.getBookByCategoryId = async(catId)=>{
=======
exports.getBookByCategoryId = async (catId) => {
>>>>>>> tin
    return new Promise((resolve, reject) => {
        let sql = "SELECT bookId, bookName, bookImg, bookPrice, enable FROM book where catId = " + catId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

<<<<<<< HEAD
exports.getDetailBookById = async(bookId)=>{
=======
exports.getDetailBookById = async (bookId) => {
>>>>>>> tin
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM book where bookId = " + bookId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

<<<<<<< HEAD
exports.getBookByCart = async(bookId, cartId)=>{
=======
exports.getBookByCart = async (bookId, cartId) => {
>>>>>>> tin
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM bookcart where bookId = ${bookId} and cartId = ${cartId}`;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}