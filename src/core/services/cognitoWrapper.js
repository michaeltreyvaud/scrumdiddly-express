const AWS = require('aws-sdk');
const Logger = require('../../utils/Logger');
const CognitoErrorHandler = require('../../utils/cognitoErrorHandler');

const api = () => {
  const Cognito = new AWS.CognitoIdentityServiceProvider();
  const errorHandler = CognitoErrorHandler(Logger);
  Cognito.config.region = process.env.AWS_REGION;

  //  Update the users password
  const changePassword = (accessToken, oldPassword, newPassword) => {
    Logger.info(`changePassword with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };
    return Cognito.changePassword(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Confirms a new Password
  const confirmForgotPassword = (confirmationCode, userName, password) => {
    Logger.info(`confirmForgotPassword with confirmationCode: ${confirmationCode} and userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Password: password,
      Username: userName,
    };
    return Cognito.confirmForgotPassword(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Confirms a user account
  const confirmSignUp = (confirmationCode, userName) => {
    Logger.info(`confirmSignUp with confirmationCode: ${confirmationCode} and userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: userName,
    };
    return Cognito.confirmSignUp(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Deletes a user from the user pool
  const deleteUser = (accessToken) => {
    Logger.info(`deleteUser with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.deleteUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Send code to reset Password
  const forgotPassword = (userName) => {
    Logger.info(`forgotPassword with userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: userName,
    };
    return Cognito.forgotPassword(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Get user info
  const getUser = (accessToken) => {
    Logger.info(`getUser with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.getUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Signs user out from all devices
  const globalSignOut = (accessToken) => {
    Logger.info(`globalSignOut with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.globalSignOut(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Register a user
  const signUp = (userName, email, password) => new Promise((resolve, reject) => {
    Logger.info(`signUp with userName : ${userName} and Email Address ${email}`);
    const emailData = {
      Name: 'email',
      Value: email,
    };
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Password: password,
      Username: userName,
      UserAttributes: [emailData],
    };
    return Cognito.signUp(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('signUp', err));
      Logger.info(`signUp success with data: ${data}`);
      return resolve(data);
    });
  });

  //  Resend user confirmation code
  const resendConfirmationCode = (userName) => {
    Logger.info(`resendConfirmationCode with userName : ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: userName,
    };
    return Cognito.resendConfirmationCode(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  return {
    changePassword,
    confirmForgotPassword,
    confirmSignUp,
    deleteUser,
    forgotPassword,
    getUser,
    globalSignOut,
    signUp,
    resendConfirmationCode,
  };
};

module.exports = api;
