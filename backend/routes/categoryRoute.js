const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const protect = require("../middlewares/authorization");

router.route('/')
    .get(categoryController.getAllCategory);

module.exports = router;