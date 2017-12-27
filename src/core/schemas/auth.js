const api = {
  login: {
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
