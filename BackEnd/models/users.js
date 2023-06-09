const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const validator = require('mongoose-validator');

const emailValidation = [
    validator({
        validator: 'isEmail'
    })
]

/**
 * Create a schema to store books
 * @constructor User
 */
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: emailValidation },
    password: { type: String, required: true }
})

// apply unique validation of user email.
userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model( 'User', userSchema );


module.exports = User;