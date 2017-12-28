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
};

module.exports = api;
