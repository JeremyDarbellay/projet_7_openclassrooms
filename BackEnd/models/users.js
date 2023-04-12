const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

/**
 * use email regexp used by html input attribute "email"
 * later on maybe add an email sending verification ?
 * source : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
 * @type {RegExp}
 */
const emailHtmlValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/**
 * Create a schema to store books
 * @constructor User
 */
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: [emailHtmlValidation] },
    password: { type: String, required: true }
})

// apply unique validation of user email.
userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model( 'User', userSchema );


module.exports = User;