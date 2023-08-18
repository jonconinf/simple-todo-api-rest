const rateLimit = require('express-rate-limit');

module.exports.appLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
    max: 100, // Número máximo de intentos de inicio de sesión permitidos en la ventana
    message: 'You exceeded the max request attemps.',
});

module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
    max: 5, // Número máximo de intentos de inicio de sesión permitidos en la ventana
    message: 'You exceeded the max login attemps.',
});