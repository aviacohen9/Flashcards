const { Router } = require('express');
const { signup, login } = require('./authController');

const router = Router();

//Authentication API endpoints
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;