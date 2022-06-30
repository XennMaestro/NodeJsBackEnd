const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

//Post a new user in the database
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

//Get all of the current user in the Database
exports.getAllUsers = catchAsync(async (req, res) => {
    //BUILD QUERY
    const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    //EXECUTE QUERY
    const users = await features.query;

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

//Post a new user in the database
exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

//Patch a new user in the database
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!user){
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

//Delete a new user in the database
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
// 1) Create error if user POSTs password data
if (req.body.password || req.body.passwordConfirm) {
    return next(
    new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
    )
    )};
    
    //2) Update user document
    const filteredBody = filterObj(req.body, 'age', 'firstName', 'lastName', 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidator: true
    });   
        
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});