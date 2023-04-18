// routeur livres

const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);
router.get("/bestrating", booksController.getBestRatedBooks);
router.get("/:id", booksController.getOneBook);

// middleware auth
const authentification = require('../middlewares/authentification');
// file to memory
const multer = require('../middlewares/multer');
// image to webp
const sharp = require('../middlewares/sharp');


router.post("/", authentification, multer, sharp, booksController.createOneBook);
router.put("/:id", authentification, multer, sharp, booksController.modifyOneBook);
router.delete("/:id", authentification, booksController.deleteOneBook);
router.post("/:id/rating", authentification, booksController.RateOneBook);

module.exports = router;
