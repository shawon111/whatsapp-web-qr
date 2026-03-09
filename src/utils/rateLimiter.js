const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15, // limit each IP to 15 requests per minute
    standardHeaders: true, 
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again after 15 minutes'
    }
});

module.exports = apiLimiter;