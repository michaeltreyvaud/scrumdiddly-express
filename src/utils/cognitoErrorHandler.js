const api = Logger => ({
  parseError: (functionName, err) => {
    Logger.error(`${functionName} error with data: ${err}`);
    const error = new Error(err.code);
    error.code = err.statusCode;
    return error;
  },
});

module.exports = api;
