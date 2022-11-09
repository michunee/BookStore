const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  const user = await User.getAllUser();
  res.status(200).json({
    user: user,
  });
};

const getUserByUsername = async (req, res) => {
  console.log(req.user);
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  res.status(200).json({
    user: user,
  });
};

const updateUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.updateUserByUsername(username, req.body);
  res.status(200).json({
    message: "Update user success!",
  });
};

module.exports = {
  getAllUser,
  getUserByUsername,
  updateUserByUsername,
};
