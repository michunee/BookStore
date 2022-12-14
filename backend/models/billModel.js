const db = require("./database");

exports.getBillByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM bill WHERE userId = ${userId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getBillByBillId = async (billId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM bill WHERE billId = ${billId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.createBill = async (cartId, userId, body) => {
  const { price, ship, discount, totalPrice } = body;
  const billData = { cartId, userId, price, ship, discount, totalPrice };
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO bill SET ?`;
    db.query(sql, billData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
