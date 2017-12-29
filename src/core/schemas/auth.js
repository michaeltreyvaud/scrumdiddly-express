const api = {
  login: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['userName', 'password'],
  },
  signUp: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['userName', 'email', 'password'],
  },
  confirm: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
      },
      confirmationCode: {
        type: 'string',
      },
    },
    required: ['userName', 'confirmationCode'],
  },
  forgot: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
      },
    },
    required: ['userName'],
  },
};

module.exports = api;
