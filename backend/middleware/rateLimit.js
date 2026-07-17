const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 minutes',
});

module.exports = limiter;