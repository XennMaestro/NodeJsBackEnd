const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const catchAsync = require("../Utils/catchAsync");

const AppError = require("../Utils/appError");

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
        email: req.body.email,
        age: req.body.age
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