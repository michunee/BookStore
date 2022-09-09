const db = require('./database');

exports.getUserById = async(userId)=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM user WHERE userId = " + userId;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.createUser = async(username, password, birthname, email, phonenumber, address, admin)=>{
    let userData = {
        username , password, birthname, email, phonenumber, address, admin
    }
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO user SET ?";
        db.query(sql, userData, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}