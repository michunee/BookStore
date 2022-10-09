const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.route('/:username')
    .get(cartController.getDetailCartByUsername);

router.route('/:cartId/book/:bookId')
    .post(cartController.addBookIntoCart)
    .delete(cartController.deleteBookFromCart);

router.route('/:cartId/book/:bookId/increase')
    .patch(cartController.increaseBookInCart)

router.route('/:cartId/book/:bookId/decrease')
    .patch(cartController.decreaseBookInCart)

module.exports = router;