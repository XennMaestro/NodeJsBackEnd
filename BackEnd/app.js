const express = require('express');

const app = express();

const AppError = require('./Utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');


//Global MiddleWare
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Routes
app.use('/api/v1/users', userRouter);

//Undefined Route Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
