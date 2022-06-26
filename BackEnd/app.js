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

module.exports = app;
