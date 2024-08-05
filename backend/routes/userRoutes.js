const express = require('express');
const { register, login, getMe } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware.protect, getMe);

module.exports = router;
