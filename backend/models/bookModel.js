const db = require('./database');

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
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getBookByCategoryId = async (catId) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT bookId, bookName, bookImg, bookPrice, enable FROM book where catId = " + catId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getDetailBookById = async (bookId) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM book where bookId = " + bookId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getBookByCart = async (bookId, cartId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM bookcart where bookId = ${bookId} and cartId = ${cartId}`;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}