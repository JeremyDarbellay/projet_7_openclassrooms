const mongoose = require('mongoose');

let currentYear = new Date().getFullYear();

/**
 * Define a subschema for grades
 * in the book model
 */
const rateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    grade: { type: Number, min: 0, max: 5, required: true }
})

/**
 * Create a schema to store books
 * @constructor Book
 */
const bookSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, max: currentYear, required: true },
    genre: { type: String, required: true },
    ratings: [rateSchema],
    averageRating: { type: Number, required: false },
})

const Book = mongoose.model( 'Book', bookSchema );

module.exports = Book;