const express = require("express");
const cors = require("./middlewares/cors");

const app = express();
/** parse body as json */
app.use(express.json());
/** cors config for our server */
app.use(cors);

const connexion = require('./config/db');

const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

/**
 * Not Found Route
 * catch all other routes
 */
app.use('*', (req, res) => { res.status(404).json({ message: "Not Found"}) })

module.exports = app;
