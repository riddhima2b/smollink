const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 minutes',
});

const authLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 10 minutes',
    skipSuccessfulRequests: true, // Only count failed requests
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const redirectLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // generous, just to stop abuse/scraping
    message: 'Too many requests, please slow down',
});

module.exports = {limiter, authLimiter, redirectLimiter};