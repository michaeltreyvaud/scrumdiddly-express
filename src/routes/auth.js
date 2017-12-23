const express = require('express');
const { Validator } = require('jsonschema');

const router = express.Router();

router.post('/login', (req, res) => {
  const { body } = req;
  const jsonValidation = new Validator();
  const objectSchema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['email', 'password'],
  };
  if (!jsonValidation.validate(body, objectSchema).valid) {
    res.sendStatus(400);
  } else {
    const { email, password } = body;
    res.status(200).json({
      email,
      password,
    });
  }
});

module.exports = router;
