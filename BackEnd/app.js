const express = require('express');

const app = express();

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
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;
