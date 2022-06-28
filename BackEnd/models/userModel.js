const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Missing user password'],
        minLength: 8,
        validate: {
            //This only works on CREATE and SAVE!!!
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
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

userSchema.pre('save', async function(next) {
    //Only run this function if passwords was acutally modified
    if(!this.isModified('password')) return next();

    //Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Clear matching password, since it is no longer needed
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;