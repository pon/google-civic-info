var config      = require('./config');
var gciFactory  = require('../src');
var chai        = require('chai');
var expect      = chai.expect;

describe('GCI: Unit', function () {
  var gci;
  beforeEach(function () {
    gci = gciFactory(config);
  });

  describe('Constructor', function () {
    it('should throw with bad credentials', function () {
      expect(gciFactory.bind(null, {
        apiKey: 123
      })).to.throw(/^apiKey/);
    });
  });
});
