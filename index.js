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

const app = express();
app.use(cors());
app.options('*', cors())

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use('/bookstore/books', bookRouter);
app.use('/bookstore/users', userRouter);

// catch 404 and forward to error handler
<<<<<<< HEAD
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
=======
app.use(catchErrorMiddleware);

// error handler
app.use(errorHandlerMiddleware);
>>>>>>> 0807c70cf34f0a882585cb3f91e3b1751a925cba

module.exports = app;
