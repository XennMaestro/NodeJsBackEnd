const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Missing user first name']
    },
    lastName: {
        type: String,
        required: [true, 'Missing user last name']
    },
    password: {
        type: String,
        required: [true, 'Missing user password'],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Missing user password'],
        minLength: 8
    },
    email: {
        type: String,
        required: [true, 'Missing user email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    age: {
        type: Number,
        required: [true, 'Missing user age']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;