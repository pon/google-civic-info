var createError = require('create-error');

module.exports = {
  InvalidCredentials: createError('InvalidCredentials', {
    message: 'apiKey must be provided'
  })
};
