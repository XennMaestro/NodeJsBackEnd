const User = require("../models/userModel");



//Get all of the current user in the Database
exports.getAllUsers = async (req, res) => {


};

//Post a new user in the database
exports.createUser = async (req, res) => {
    try{

        console.log(req.body);

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