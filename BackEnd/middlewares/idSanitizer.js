const mongoSanitize = require('express-mongo-sanitize');

/**
 * remove $ and . from params request
 */
const idSanitizer = (req, res, next) => {
    if (req.params.id) {
        mongoSanitize.sanitize(req.params.id);
    }
    next();
}

module.exports = idSanitizer;