const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    const user = await User.getAllUser();
    res.status(200).json({
        user: user
    })
}

const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await User.getUserByUsername(username);
    res.status(200).json({
        user: user
    })
}

const createUser = async (req, res) => {
    const { username, password, birthname, email, phonenumber, address, admin } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, hashedPassword, birthname, email, phonenumber, address, admin)
    res.status(200).json({
        status: "success",
        message: "Create new user success !",
    })
}

module.exports = {
    getAllUser,
    getUserByUsername,
    createUser
}




