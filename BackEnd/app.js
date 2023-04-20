const express = require("express");
const cors = require("./middlewares/cors");
const helmet = require("helmet");
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const idSanitizer = require('./middlewares/idSanitizer');

const app = express();

/*
 * security concerns
 */
// prevent xss attack 
app.use(xss());
// define various http headers for security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// parse body as json and limit to prevent DOS attack
app.use(express.json({ limit: '20kb'}));
// cors config for our server
app.use(cors);
// remove $ and . from request params id
app.use(idSanitizer);

// rate limit to prevent bruteforce
// 1000 request per 15 min
const globalApiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
})
// 100 request per 15 min
const userApiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

// Apply the rate limiting middleware to API calls only
app.use('/api', globalApiLimiter)

const connexion = require('./config/db');

const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");

app.use('/api/books', booksRoutes);
// more limited to protect our users
app.use('/api/auth', userApiLimiter, userRoutes);

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

/**
 * Not Found Route
 * catch all other routes
 */
app.use('*', (req, res) => { res.status(404).json({ message: "Not Found"}) })

module.exports = app;
