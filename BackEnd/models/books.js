const mongoose = require('mongoose');
const validator = require('mongoose-validator');

let currentYear = new Date().getFullYear();

/*
 * input validations
 */
const stringValidation = [
    validator({
        validator: (val) => {
            return Object.prototype.toString.call(val) === '[object String]';
          },
          message: 'Not a string'
    })
];

const intValidation = [
    validator({
        validator: (val) => {
            return Number.isInteger(val);
        }
    })
];

/**
 * Define a subschema for grades
 * in the book model
 */
const rateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    grade: { type: Number, min: 0, max: 5, required: true, validate: intValidation }
});

/**
 * Create a schema to store books
 * @constructor Book
 */
const bookSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, validate: stringValidation },
    author: { type: String, required: true, validate: stringValidation },
    imageUrl: { type: String, required: true },
    year: { type: Number, max: currentYear, required: true, validate: intValidation },
    genre: { type: String, required: true, validate: stringValidation  },
    ratings: [rateSchema],
    averageRating: { type: Number, required: false },
})

const Book = mongoose.model( 'Book', bookSchema );

module.exports = Book;