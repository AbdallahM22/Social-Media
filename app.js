const express = require('express');
require('dotenv').config();
require('express-async-errors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postsRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// parsing body
app.use(express.json());
app.use(express.urlencoded());


// routes
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/reviews', reviewRouter);

// not found pages
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//global error handling
app.use(globalErrorHandler);
module.exports = app;
