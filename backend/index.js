const createError = require('http-errors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const catchErrorMiddleware = require('./middlewares/catchError');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const bookRouter = require('./routes/bookRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(catchErrorMiddleware);

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;