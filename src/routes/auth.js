const AuthController = require('../core/controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);
router.post('/confirm', AuthController.confirm);
router.post('/forgot', AuthController.forgot);
router.post('/resend', AuthController.resend);
router.post('/confirmForgotPassword', AuthController.confirmForgotPassword);

module.exports = router;
