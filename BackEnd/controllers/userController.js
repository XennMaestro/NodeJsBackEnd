const User = require("../models/userModel");
const APIFeatures = require("../Utils/apiFeatures");

//Post a new user in the database
exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

//Get all of the current user in the Database
exports.getAllUsers = async (req, res) => {
    try{
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
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

//Post a new user in the database
exports.createUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Patch a new user in the database
exports.updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

//Delete a new user in the database
exports.deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};