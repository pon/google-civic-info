var GCI     = require('./gci');

var gciFactory = function (config) {
  return new GCI(config);
};

gciFactory.errors = require('./errors');

module.exports = gciFactory;
