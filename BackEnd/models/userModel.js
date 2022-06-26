const mongoose = require('mongoose');

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
        required: [true, 'Missing user password']
    },
    email: {
        type: String,
        required: [true, 'Missing user email'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Missing user age']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;