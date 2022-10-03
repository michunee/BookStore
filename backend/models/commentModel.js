const db = require('./database');

exports.getAllComment = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM comment";
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getCommentByBook = async(bookId)=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM comment WHERE bookId = " + bookId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}