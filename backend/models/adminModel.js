const db = require("./database");

exports.createAdmin = async (username, password, email) => {
  let userData = {
    username,
    password,
    email,
  };
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO user SET ?, admin = 1";
    db.query(sql, userData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
