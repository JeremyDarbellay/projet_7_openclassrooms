// routeur livres

const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);
router.get("/bestrating", booksController.getBestRatedBooks);
router.get("/:id", booksController.getOneBook);

// middleware auth
const authentification = require('../middlewares/authentification');

router.post("/", authentification, booksController.createOneBook);
router.put("/:id", authentification, booksController.modifyOneBook);
router.delete("/:id", authentification, booksController.deleteOneBook);
router.post("/:id/ratings", authentification, booksController.RateOneBook);

module.exports = router;
