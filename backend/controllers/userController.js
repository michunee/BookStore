const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.getUserById(userId);
    res.status(200).json({
        user : user
    })
}

const createUser = async (req, res) => {
    const {username, password , birthname, email, phonenumber, address, admin} = req.body;
    let hashedPassword = await bcrypt.hash(password,10);
    const user = await User.createUser(username, hashedPassword, birthname, email, phonenumber, address, admin)
    res.status(200).json({
        status : "success",
        message : "Create new user success !",
    })
}

module.exports = {
    getUser,
    createUser
}