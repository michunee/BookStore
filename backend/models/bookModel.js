const db = require("./database");

exports.getAllBook = async (page) => {
  return new Promise((resolve, reject) => {
    if (page == null) {
      let sql = "SELECT * FROM book";
      db.query(sql, (err, data) => {
        if (err) console.log(err);
        else resolve(data);
      });
    }
    let sql =
      "SELECT b.bookId, bookName, bookImg, bookPrice, enable, AVG(rating) as avgRating FROM book as b LEFT JOIN comment ON b.bookId = comment.bookId GROUP BY b.bookId LIMIT " +
      12 +
      " OFFSET " +
      12 * (page - 1);
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getBookByCategoryId = async (catId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT b.bookId, bookName, bookImg, bookPrice, enable, AVG(rating) as avgRating FROM book as b LEFT JOIN comment ON b.bookId = comment.bookId where catId = ${catId} GROUP BY b.bookId`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getDetailBookById = async (bookId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT b.bookId, bookName, bookDes, rating, bookAuthor, amount, catId, bookImg, bookPrice, enable, AVG(rating) as avgRating FROM book as b LEFT JOIN comment ON b.bookId = comment.bookId where b.bookId = ${bookId} GROUP BY b.bookId`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getBookByCart = async (bookId, cartId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM bookcart where bookId = ${bookId} and cartId = ${cartId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.updateBookById = async (bookId, body) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE book SET ? WHERE bookId = ${bookId}`;
    db.query(sql, body, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
