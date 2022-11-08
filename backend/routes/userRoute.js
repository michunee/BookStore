const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const protect = require("../middlewares/authorization");

router.route('/login')
    .post(authController.login)

router.route('/register')
    .post(authController.register)

router.route('/logout')
    .post(authController.signout)

router.route('/')
    .get(protect.verifyAdmin, userController.getAllUser)

router.route('/:username')
    .get(userController.getUserByUsername);

module.exports = router;