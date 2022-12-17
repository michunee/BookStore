const db = require("./database");

exports.getReceiverbyCartId = async (cartId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM receiver WHERE cartId = ${cartId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.createReceiverbyCartId = async (cartId, body) => {
  const { receiverName, receiverPhone, receiverAddress } = body;
  const receiverData = { cartId, receiverName, receiverPhone, receiverAddress };
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO receiver SET ?`;
    db.query(sql, receiverData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
