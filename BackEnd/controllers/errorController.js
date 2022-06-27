const AppError = require("../Utils/appError");

const handleCastErrorDB = err => {
    const message = `Inavlid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);        
}

const handleDuplicateFieldsDB = err => {
    const message = `Duplicate User. Please create another user.`;
    return new AppError(message, 400); 
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid User data. ${errors.join('. ')}`;
    return new AppError(message, 400); 
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    //Operational error that we trust
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        console.log('Error: ', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    }else{
        let error = { ...err };

        console.log(err);
        if(err.name === 'CastError'){
            error = handleCastErrorDB(error);
        }
        
        if(err.code === 11000){
            error = handleDuplicateFieldsDB(error);
        }

        if(err.name === 'ValidationError'){
            error = handleValidationErrorDB(error);
        }

        sendErrorProd(error,res);
    }
};