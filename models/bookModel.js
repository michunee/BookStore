const db = require('./database');
var listData =[];

exports.getAllBooks = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM book";
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else
            {
                listData = data;
                resolve(listData);
            }
        })
    })
}