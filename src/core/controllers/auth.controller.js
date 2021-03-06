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
      .then(data => res.status(200).json(data))
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
      .then(data => res.status(200).json(data))
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
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
  forgot: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.forgot).valid) return res.sendStatus(400);
    const { userName } = body;
    return Cognito.forgotPassword(userName)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
  resend: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.resend).valid) return res.sendStatus(400);
    const { userName } = body;
    return Cognito.resendConfirmationCode(userName)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
  confirmForgotPassword: (req, res) => {
    const { body } = req;
    const jsonValidation = new Validator();
    if (!jsonValidation.validate(body, ObjectSchemas.confirmForgotPassword).valid) return res.sendStatus(400);
    const { userName, confirmationCode, password } = body;
    return Cognito.confirmForgotPassword(userName, confirmationCode, password)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  },
};

module.exports = api;
