const AuthController = require('../core/controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);
router.post('/confirm', AuthController.confirm);
router.post('/forgot', AuthController.forgot);

module.exports = router;
