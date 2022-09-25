const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createSendToken = (user, statusCode, res)=>{
    res.status(statusCode).json({
        status: 'success',
        data : user
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status : "fail",
            message : "Please provide username and password !"
        });
    }
    // 2) Check if user exists && password is correct
    const user = await User.getUserByEmail(email);
    const isEqual = await bcrypt.compare(password, user[0].password);
    if (!user || !isEqual) {
        return res.status(401).json({
            status : "fail",
            message : "Incorrect password !"
        });
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
}

module.exports = {
    login
}