const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const limiters = require('../middleware/limiters');

router.post('/register', accountController.register);
router.post('/login', limiters.loginLimiter, accountController.login);

module.exports = router;