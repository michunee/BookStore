const Admin = require("../models/adminModel");

const getAllAdmin = async (req, res) => {
  const admins = await Admin.getAllAdmin();
  res.status(200).json({
    admins,
  });
};

module.exports = {
  getAllAdmin,
};
