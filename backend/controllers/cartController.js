const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

const getDetailCartByUsername = async(req, res) => {
    const username = req.params.username
    const user = await User.getUserByUsername(username)
    const userId = user[0].userId
    const cart = await Cart.getDueCartByUserId(userId);
    const cartId = cart[0].cartId;
    const cartList = await Cart.getDetailCartByCartId(cartId);
    res.status(200).json({
        status : "success",
        data : cartList
    })
}

const addBookIntoCart = async(req, res) => {
    const cartId = req.params.cartId;
    const bookId = req.params.bookId;
    const amount = req.body.bookAmount;
    const book = await Book.getDetailBookById(bookId)
    const totalprice = amount * book[0].bookPrice;
    const checkBook = await Book.getBookByCart(bookId)
    const userId = await User.getUserIdIdByCartId(cartId)
    let username = await User.getUsernameByUserId(userId[0].userId)
    username = username[0].username
    if(!checkBook[0]){
        const cartList = await Cart.addBookIntoCart(cartId,bookId,amount,totalprice);
        res.redirect(`/api/carts/${username}`)
    }
    else{
        const newAmount = amount + checkBook[0].amount
        const newtotalprice = totalprice + checkBook[0].totalprice;
        const cartList = await Cart.updateBookFromCart(cartId,bookId,newAmount,newtotalprice);
        res.redirect(`/api/carts/${username}`)
    }
}

const deleteBookFromCart = async (req, res) => {
    const cartId = req.params.cartId;
    const bookId = req.params.bookId;
    const userId = await User.getUserIdIdByCartId(cartId)
    let username = await User.getUsernameByUserId(userId[0].userId)
    username = username[0].username
    const deleteBook = await Cart.deleteBookFromCart(cartId, bookId)
    res.redirect(`/api/carts/${username}`)
}

module.exports = {
    addBookIntoCart,
    getDetailCartByUsername,
    deleteBookFromCart
}