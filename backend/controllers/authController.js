const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createSendToken = (user, statusCode, res) => {
    const accessToken = jwt.sign(
        {
            userId: user[0].userId,
            isAdmin: user[0].admin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.cookie('jwt', accessToken, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        accessToken,
        data: user
    });
}

const register = async (req, res) => {
    const { username, password, birthname, email, phonenumber, address, admin } = req.body;
    // 1) Check if information is full
    if (!username || !password || !birthname || !email || !phonenumber || !address || !admin) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide full information !",
        });
    }
    // 2) Check if user exists
    const checkUser = await User.getUserByEmail(email);
    if (checkUser[0]) {
        return res.status(400).json({
            status: "fail",
            message: "User already exists",
        });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.createUser(username, hashedPassword, birthname, email, phonenumber, address, admin)
    const user = await User.getUserByEmail(email);
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Vui lòng điền đầy đủ thông tin email và mật khẩu !"
        });
    }
    // 2) Check if user exists && password is correct
    const user = await User.getUserByEmail(email);
    if (!user[0]) {
        return res.status(400).json({
            status: "fail",
            message: "Email không tồn tại !",
        });
    }
    const isEqual = await bcrypt.compare(password, user[0].password);
    if (!user || !isEqual) {
        return res.status(401).json({
            status: "fail",
            message: "Sai mật khẩu. Vui lòng nhập lại!"
        });
    }
    // console.log(user);
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
}

module.exports = {
    register,
    login
}