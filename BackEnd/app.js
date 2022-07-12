const express = require('express');

const app = express();

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const morgan = require('morgan');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

const hpp = require('hpp');

const cors = require('cors');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');


//1)Global MiddleWare

    //Enable cors requests
    app.use(cors());

    //Security HTTP Headers
    app.use(helmet());

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    //Development loggin
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    //Limit request from same API
    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many request from this IP. Please try again in an hour.'
    });

    app.use('/api',limiter);

    //Body Parser, reading data from body into req.body
    app.use(express.json({
        limit: '10kb'
    }));

    //Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    //Data sanitization against XSS attacks
    app.use(xss());

    //Prevent parameter pollution
    app.use(hpp({
        whitelist: ['duration']
    }));
//2)Routes
    app.use('/api/v1/users', userRouter);

    //Undefined Route Handler
    app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    });

    //Error handling middleware
    app.use(globalErrorHandler);

    module.exports = app;
