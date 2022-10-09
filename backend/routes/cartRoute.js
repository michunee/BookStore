const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyUser, verifyAdmin } = require("../middlewares/authorization");

router.route('/:username')
    .get(verifyUser, cartController.getDetailCartByUsername);

router.route('/:cartId/book/:bookId')
    .post(verifyUser, cartController.addBookIntoCart)
    .delete(verifyUser, cartController.deleteBookFromCart);

router.route('/:cartId/book/:bookId/increase')
    .patch(verifyUser, cartController.increaseBookInCart)

router.route('/:cartId/book/:bookId/decrease')
    .patch(verifyUser, cartController.decreaseBookInCart)

module.exports = router;