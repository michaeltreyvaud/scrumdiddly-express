const AuthController = require('../core/controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);

module.exports = router;
