const mongoose = require('mongoose');

/**
 * Define a subschema for book model
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
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [rateSchema],
    averageRating: { type: String, required: true },
})

const Book = mongoose.model( 'Book', bookSchema );

module.exports = Book;