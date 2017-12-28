const Cognito = require('../services/cognitoWrapper')();
const { Validator } = require('jsonschema');
const ObjectSchemas = require('../schemas/auth');

const api = {
  login: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.login).valid) return res.sendStatus(400);
    const { userName, password } = body;
    return Cognito.adminInitiateAuth(userName, password)
      .then(userData => res.status(200).json(userData))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
  signUp: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.signUp).valid) return res.sendStatus(400);
    const { userName, email, password } = body;
    return Cognito.signUp(userName, email, password)
      .then(userData => res.status(200).json(userData))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
  confirm: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.confirm).valid) return res.sendStatus(400);
    const { userName, confirmationCode } = body;
    return Cognito.confirmSignUp(userName, confirmationCode)
      .then(userData => res.status(200).json(userData))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
};

module.exports = api;
