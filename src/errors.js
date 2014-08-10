var createError = require('create-error');

function RequestError (status) {
  this.name = 'API Request Error';
  this.message = 'API request failed with the following status: ' + status;
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

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
  }),
  RequestError: RequestError
};
