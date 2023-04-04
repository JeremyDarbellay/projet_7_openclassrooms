const Book = require('../models/books')

exports.getOneBook = (req, res, next) => {}
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(500).json({ error }))
}
//authed
exports.updateOneBook = (req, res, next) => {}
exports.deleteOneBook = (req, res, next) => {}
exports.createOneBook = (req, res, next) => {}

exports.getBestRatedBooks = (req, res, next) => {}

exports.RateOneBook = (req, res, next) => {}