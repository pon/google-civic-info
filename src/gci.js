var needle      = require('needle');
var errors      = require('./errors');

var internals = {};
var BASE_URL = 'https://www.googleapis.com/civicinfo/v1/';

/**
 * Constructor
 * @author Peter Nagel
 * @param {Object} config Config object for GCI
 */
var GCI = function (config) {
  if (config && typeof config.apiKey === 'string') {
    this.apiKey = config.apiKey;
  } else {
    throw new Error('apiKey must be set');
  }
};

/**
 * Make a request with the specified data
 * @author Peter Nagel
 * @param {String} method
 * @param {Object} data
 * @param {String} endpoint
 * @param {Function} done
 */
internals.repRequest = function (method, data, endpoint, done) {
  var opts = {
    json: true
  };

  endpoint = BASE_URL + endpoint;
  needle.request(method, endpoint, data, opts, function (err, resp) {
    if (err) { return done(err, null); }
    if (resp.body.status !== 'success') {
      done(new errors.RequestError(resp.body.status), null);
    } else {
      done(null, resp.body);
    }
  });
}

/**
 * Retrieve representative information for address
 * @author Peter Nagel
 * @param {String} address Google formatted address string
 * @param {Object} config optional parameters for request
 * @param {Function} done callback with (err, data) signature
 */
GCI.prototype.getRepresentatives = function (address, config, done) {
  //Handle no address, with config object
  if (typeof address === 'object') {
    done = config;
    config = address;
    address = undefined;
  } else {
    if (typeof config === 'function') {
      done = config;
      config = undefined;
    }
  }

  //Check validity of includeOffices
  if (config && config.includeOffices &&
      (config.includeOffices !== true && config.includeOffices !== false)) {
    throw new errors.InvalidIncludeOffices();
  }

  //Check validity of recursive
  if (config && config.recursive &&
      (config.recursive !== true && config.recursive !== false)) {
    throw new errors.InvalidRecursive();
  }

  //Check validity of ocdId
  if (config && config.ocdId && typeof config.ocdId !== 'string') {
    throw new errors.InvalidOcdId();
  } else {
    if (config && config.ocdId && address) { throw new errors.InvalidOcdId(); }
  }

  var data = {};
  if (address) {
    data.address = address;
  }

  //Build query string
  var query = 'representatives/lookup?key=' + this.apiKey;
  if (config) {
    Object.keys(config).forEach(function (key) {
      query = query + '&' + key + '=' + config[key];
    });
  }

  internals.repRequest('post', data, query, function (err, resp) {
    if (err) { return done(err, null); }
    done(null, resp);
  });
};

/**
 * Retrieve available elections to query
 * @author Peter Nagel
 * @param {Function} done callback with err, data, signature
 */
GCI.prototype.getElections = function (done) {
  var endpoint = BASE_URL + 'elections?key=' + this.apiKey;
  needle.get(endpoint, function (err, resp) {
    if (err) { return done(err, null); }
    done(null, resp.body);
  });
};

module.exports = GCI;
