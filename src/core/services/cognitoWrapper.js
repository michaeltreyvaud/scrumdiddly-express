const AWS = require('aws-sdk');
const Logger = require('../../utils/Logger');
const CognitoErrorHandler = require('../../utils/cognitoErrorHandler');
const shortid = require('shortid');

const api = () => {
  const Cognito = new AWS.CognitoIdentityServiceProvider();
  const errorHandler = CognitoErrorHandler(Logger);
  Cognito.config.region = process.env.AWS_REGION;

  //  Create a user as admin
  const adminCreateUser = (userName, email) => {
    Logger.info(`adminCreateUser with userName: ${userName} and email: ${email}`);
    const emailData = {
      Name: 'email',
      Value: email,
    };
    const tempPassword = shortid.generate();
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
      TemporaryPassword: tempPassword,
      UserAttributes: [emailData],
    };
    return Cognito.adminCreateUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Confirm a users account as admin
  const adminConfirmSignUp = (userName) => {
    Logger.info(`adminConfirmSignUp with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminConfirmSignUp(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Delete a user as admin
  const adminDeleteUser = (userName) => {
    Logger.info(`adminDeleteUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminDeleteUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Disable a user as admin
  const adminDisableUser = (userName) => {
    Logger.info(`adminDisableUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminDisableUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Enable a user as admin
  const adminEnableUser = (userName) => {
    Logger.info(`adminEnableUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminEnableUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Gets a user as admin
  const adminGetUser = (userName) => {
    Logger.info(`adminGetUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminGetUser(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Initiates the authentication flow, as admin
  const adminInitiateAuth = (userName, password) => new Promise((resolve, reject) => {
    Logger.info(`adminInitiateAuth with userName: ${userName}`);
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: process.env.APP_CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      AuthParameters: {
        USERNAME: userName,
        PASSWORD: password,
      },
    };
    return Cognito.adminInitiateAuth(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('adminInitiateAuth', err));
      Logger.info(`adminInitiateAuth success with data: ${data}`);
      return resolve(data);
    });
  });

  //  Reset a users password as admin
  const adminResetUserPassword = (userName) => {
    Logger.info(`adminInitiateAuth with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminResetUserPassword(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

  //  Global signout as admin
  const adminUserGlobalSignOut = (userName) => {
    Logger.info(`adminUserGlobalSignOut with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminUserGlobalSignOut(params, (err, data) => {
      if (err) Logger.error(err, err.stack);
      else Logger.info(data);
    });
  };

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
  const confirmForgotPassword = (userName, confirmationCode, password) => new Promise((resolve, reject) => {
    Logger.info(`confirmForgotPassword with confirmationCode: ${confirmationCode} and userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Password: password,
      Username: userName,
    };
    return Cognito.confirmForgotPassword(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('confirmForgotPassword', err));
      Logger.info(`confirmForgotPassword success with data: ${data}`);
      return resolve(data);
    });
  });

  //  Confirms a user account
  const confirmSignUp = (userName, confirmationCode) => new Promise((resolve, reject) => {
    Logger.info(`confirmSignUp with confirmationCode: ${confirmationCode} and userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: userName,
    };
    return Cognito.confirmSignUp(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('confirmSignUp', err));
      Logger.info(`confirmSignUp success with data: ${data}`);
      return resolve(data);
    });
  });

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
  const forgotPassword = userName => new Promise((resolve, reject) => {
    Logger.info(`forgotPassword with userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: userName,
    };
    return Cognito.forgotPassword(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('forgotPassword', err));
      Logger.info(`forgotPassword success with data: ${data}`);
      return resolve(data);
    });
  });

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
  const resendConfirmationCode = userName => new Promise((resolve, reject) => {
    Logger.info(`resendConfirmationCode with userName : ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: userName,
    };
    return Cognito.resendConfirmationCode(params, (err, data) => {
      if (err) return reject(errorHandler.parseError('resendConfirmationCode', err));
      Logger.info(`resendConfirmationCode success with data: ${data}`);
      return resolve(data);
    });
  });

  return {
    adminCreateUser,
    adminConfirmSignUp,
    adminDeleteUser,
    adminDisableUser,
    adminEnableUser,
    adminGetUser,
    adminInitiateAuth,
    adminResetUserPassword,
    adminUserGlobalSignOut,
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
