const rateLimit = require('express-rate-limit');

module.exports.appLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, //20 mins
    max: 100,
    message: 'You exceeded the max request attemps.',
});

module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 5,
    message: 'You exceeded the max login attemps.',
});