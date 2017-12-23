const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  const { body } = req;
  const { email, password } = body;
  res.status(200).json({
    email,
    password,
  });
});

module.exports = router;
