var createError = require('create-error');

module.exports = {
  InvalidCredentials: createError('InvalidCredentials', {
    message: 'apiKey must be provided'
  }),
  InvalidIncludeOffices: createError('InvalidIncludeOffices', {
    message: 'includeOffices must be either true or false'
  }),
  InvalidRecursive: createError('InvalidRecursive', {
    message: 'recursive must be either true or false'
  }),
  InvalidOcdId: createError('InvalidOcdId', {
    message: 'ocdId must be a string and can only be provided if address is not provided'
  })
};
