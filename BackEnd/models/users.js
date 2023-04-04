const mongoose = require('mongoose');

/**
 * Create a schema to store books
 * @constructor User
 */
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model( 'User', userSchema );

module.exports = User;