const Bill = require("../models/billModel.js");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const getBillByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const billList = await Bill.getBillByUserId(userId);
  res.status(200).json({
    billList: billList,
  });
};

const createBill = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const cart = await Cart.getDueCartByUserId(userId);
  const cartId = cart[0].cartId;
  await Bill.createBill(cartId, userId, req.body);
  await Cart.changeDueCartStatus(userId);
  await Cart.createCart(userId);
  res.status(200).json({
    message: "Create bill success!",
  });
};

module.exports = {
  getBillByUsername,
  createBill,
};
