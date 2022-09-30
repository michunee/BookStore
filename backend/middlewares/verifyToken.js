const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    if (
        req.headers.token &&
        req.headers.token.startsWith('Bearer')
    ) {
        token = req.headers.token.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

module.exports = verifyToken;