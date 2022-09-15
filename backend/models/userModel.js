const db = require('./database');

exports.getAllUser = async()=>{
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM user";
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}


exports.getUserByUsername = async(username)=>{
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM user WHERE username = '${username}'`;
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