var config      = require('./config');
var errors      = require('../src/errors');
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

  describe('getRepresentatives', function () {
    it('should throw with invalid includeOffices', function () {
      expect(gci.getRepresentatives.bind(null, '185 Berry Street San Francisco 94107', {
        includeOffices: 'asdf'
      })).to.throw(errors.InvalidIncludeOffices);
    });

    it('should throw with invalid recursive', function () {
      expect(gci.getRepresentatives.bind(null, '185 Berry Street San Francisco 94107', {
        includeOffices: true,
        recursive: 'asdf'
      })).to.throw(errors.InvalidRecursive);
    });

    it('should throw with invalid ocdId', function () {
      expect(gci.getRepresentatives.bind(null, {
        includeOffices: true,
        recursive: true,
        ocdId: 123
      })).to.throw(errors.InvalidOcdId);
    });

    it('should throw with valid ocdId and address', function () {
      expect(gci.getRepresentatives.bind(null, '185 Berry Street San Francisco 94107', {
        includeOffices: true,
        recursive: true,
        ocdId: 'ocdid'
      })).to.throw(errors.InvalidOcdId);
    });

    it('should succeed with valid basic', function (done) {
      gci.getRepresentatives('185 Berry Street San Francisco 94107', function (err, resp) {
        expect(resp.kind).to.eql('civicinfo#representativeInfoResponse');
        expect(resp.status).to.eql('success');
        done();
      });
    });

    it('should return error with no address', function (done) {
      gci.getRepresentatives('', function (err, resp) {
        expect(err).to.be.an.instanceOf(errors.RequestError);
        expect(err.message).to.contain('noAddressParameter');
        done();
      });
    });

    it('should return error with invalid address', function (done) {
      gci.getRepresentatives('asdf asdf', function (err, resp) {
        expect(err).to.be.an.instanceOf(errors.RequestError);
        expect(err.message).to.contain('addressUnparseable');
        done();
      });
    });
  });
});
