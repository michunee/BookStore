const verifyToken = require("./verifyToken");

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
        next();
        } else {
        res.status(403).json("You are not admin for allowed to do that!");
        }
    });
};

module.exports = {
    verifyUser,
    verifyAdmin
};