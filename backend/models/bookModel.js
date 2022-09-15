const db = require('./database');
var listData =[];

exports.getAllBook = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM book";
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getBookByCategory = async(catId)=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM book where catId = " + catId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}