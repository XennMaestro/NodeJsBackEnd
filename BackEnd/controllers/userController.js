const User = require("../models/userModel");
const APIFeatures = require("../Utils/apiFeatures");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

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
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
        status: 'success'
    });
});