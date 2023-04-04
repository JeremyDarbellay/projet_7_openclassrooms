// routeur livres

const express = require('express')
const router = express.Router()

const booksController = require('../controllers/books')

router.get('/', booksController.RateOneBook)
router.get('/:id', booksController.getOneBook)
router.get('/bestrating', booksController.getBestRatedBooks)

router.post('/', booksController.createOneBook)
router.put('/:id', booksController.updateOneBook)
router.delete('/:id', booksController.deleteOneBook)

router.post('/:id/ratings', booksController.RateOneBook)


module.exports = router