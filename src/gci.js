var needle      = require('needle');

var GCI = function (config) {
  if (config && typeof config.apiKey === 'string') {
    this.apiKey = config.apiKey;
  } else {
    throw new Error('apiKey must be set');
  }
};

module.exports = GCI;
