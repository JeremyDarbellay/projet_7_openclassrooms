const express = require("express");
// middleware
const cors = require("./middlewares/cors");

const app = express();

app.use(cors);

const authentificationRoutes = require("./routes/authentification");
const booksRoutes = require("./routes/books");

app.use('/api/books', booksRoutes)

module.exports = app;
