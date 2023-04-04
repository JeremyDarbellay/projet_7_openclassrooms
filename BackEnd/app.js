const express = require("express");
// middleware
const cors = require("./middlewares/cors");

const app = express();

const connexion = require('./config/db');

app.use(cors);

const authentificationRoutes = require("./routes/authentification");
const booksRoutes = require("./routes/books");

app.use('/api/books', booksRoutes)
app.use('*', (req, res) => { res.status(404).json({ message: "Not Found"}) })

module.exports = app;
