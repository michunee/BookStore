const db = require('./database');
var listData =[];

exports.getAllCategorys = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM category";
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