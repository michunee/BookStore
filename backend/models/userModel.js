const db = require('./database');

exports.getAllUser = async () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM user";
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}


exports.getUserByUsername = async (username) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM user WHERE username = '${username}'`;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM user WHERE email = '${email}'`;
        db.query(sql, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}

exports.createUser = async (username, password, email) => {
    let userData = {
        username, password, email
    }
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO user SET ?";
        db.query(sql, userData, (err, data) => {
            if (err) console.log(err);
            else resolve(data);
        })
    })
}