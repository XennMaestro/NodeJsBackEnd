const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

//Create a JSON Web Token JWT
const signToken = id => jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

//SignUp a new user into the application
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

//LogIn a new user into the application
exports.login = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //1) Check if email and password exist
    if(!email || !password){
      return next(new AppError('Please provide email and password', 400));
    }

    //2) Check if user exists && password is correct
    const user = await User.findOne({email: email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    //3) If everything is ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });

});

//Create a protect function to prevent Non Authenticated users from accessing routes
exports.protect = catchAsync(async(req, res, next) => {
    let token;
    //1) Get token and check if token exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('User not logged in', 401));
    }

    //2) Verify if the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) Check if user that is trying to access the route still exists
    const currentUser = await User.findById(decoded.id);
    
    if(!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists', 401));
    }
    //4) Check if user changed passwords after JWT was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed passwords! Please login again', 401))
    }

    //5) Grant Access to protected routes
    req.user = currentUser;    
    next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
};